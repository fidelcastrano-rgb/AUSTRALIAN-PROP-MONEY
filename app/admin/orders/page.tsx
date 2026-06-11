'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  Search, 
  Filter, 
  ArrowUpDown, 
  RefreshCw, 
  Clock, 
  MapPin, 
  CreditCard, 
  DollarSign, 
  ShoppingBag, 
  ChevronDown, 
  CheckCircle2, 
  AlertCircle, 
  XCircle, 
  Truck,
  PlusCircle,
  LogOut,
  Mail
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface Order {
  order_number: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  shipping_address: string;
  country: string;
  state_region: string;
  notes: string;
  shipping_method: string;
  shipping_cost: number;
  payment_method: string;
  payment_details?: string;
  products: string; // JSON string
  total_amount: number;
  status: 'Pending' | 'Processing' | 'Completed' | 'Cancelled';
  created_at: string;
}

export default function AdminOrdersPage() {
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [sortBy, setSortBy] = useState<string>('date_desc');
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);
  const [statusUpdating, setStatusUpdating] = useState<string | null>(null);

  const fetchOrders = async (showRefreshIndicator = false) => {
    if (showRefreshIndicator) setRefreshing(true);
    else setLoading(true);

    try {
      const res = await fetch('/api/orders');
      if (res.status === 401) {
        router.replace('/admin');
        return;
      }
      const data = await res.json();
      if (res.ok && data.orders) {
        setOrders(data.orders);
      }
    } catch (err) {
      console.error("Failed to read orders list:", err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/login', { method: 'DELETE' });
    } catch (err) {
      console.error(err);
    }
    router.replace('/admin');
  };


  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleStatusUpdate = async (orderNumber: string, nextStatus: 'Pending' | 'Processing' | 'Completed' | 'Cancelled') => {
    setStatusUpdating(orderNumber);
    try {
      const res = await fetch('/api/orders', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderNumber, status: nextStatus })
      });
      if (res.ok) {
        // Optimistic update
        setOrders(prev => prev.map(o => o.order_number === orderNumber ? { ...o, status: nextStatus } : o));
      } else {
        const data = await res.json();
        alert(data.error || "Failed to update order status.");
      }
    } catch (err) {
      console.error("Failed modifying status:", err);
    } finally {
      setStatusUpdating(null);
    }
  };

  // Helper to pre-populate mock order for testing
  const createTestOrder = async () => {
    try {
      const testNames = [
        { first: 'Dan', last: 'Soder', email: 'dan.soder@hbo.com', phone: '+61412345678', country: 'Australia', state: 'NSW', addr: '10 George St, Sydney NSW 2000' },
        { first: 'Bill', last: 'Burr', email: 'bill@burr.com', phone: '+12125550199', country: 'United States', state: 'NY', addr: '200 Broadway Ave, New York NY 10001' },
        { first: 'Sarah', last: 'Linwood', email: 'sarah@linwood-media.com', phone: '+14165550143', country: 'Canada', state: 'ON', addr: '500 King St West, Toronto ON M5V 1M3' }
      ];
      const pick = testNames[Math.floor(Math.random() * testNames.length)];
      const randomSuffix = Math.floor(100000 + Math.random() * 900000).toString();
      const orderNumber = `APM-${new Date().getFullYear()}-${randomSuffix}`;

      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: pick.first,
          lastName: pick.last,
          email: pick.email,
          phone: pick.phone,
          shippingAddress: pick.addr,
          country: pick.country,
          stateRegion: pick.state,
          notes: 'Test cinematic filming order, please deliver stealth roll.',
          shippingMethod: pick.country === 'Australia' ? 'Local Shipping (Australia)' : 'Normal Fast Shipping',
          shippingCost: pick.country === 'Australia' ? 10 : 20,
          paymentMethod: pick.country === 'United States' ? 'Zelle' : 'Cryptocurrency (Fastest & Preferred)',
          items: [
            { id: 'aud_100_pack', name: 'AUD $100 Banknote Stacks', price: 90.00, quantity: 2, variationName: '100 Notes Bundle' },
            { id: 'usd_100_pack', name: 'USD $100 Banknote Stacks', price: 95.00, quantity: 1, variationName: 'Standard Movie Wrap' }
          ],
          totalAmount: 275.00
        })
      });

      if (res.ok) {
        fetchOrders(true);
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Filter and Sort Processing
  const filteredOrders = orders.filter(order => {
    // Search check
    const matchesSearch = 
      order.order_number.toLowerCase().includes(searchQuery.toLowerCase()) ||
      `${order.first_name} ${order.last_name}`.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.phone.includes(searchQuery);

    // Status filter
    const matchesStatus = statusFilter === 'All' || order.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const sortedOrders = [...filteredOrders].sort((a, b) => {
    if (sortBy === 'date_desc') {
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    } else if (sortBy === 'date_asc') {
      return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
    } else if (sortBy === 'value_desc') {
      return b.total_amount - a.total_amount;
    } else if (sortBy === 'value_asc') {
      return a.total_amount - b.total_amount;
    }
    return 0;
  });

  const getStatusBadge = (status: Order['status']) => {
    switch (status) {
      case 'Pending':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-700 border border-amber-200">
            <Clock className="w-3.5 h-3.5" /> Pending
          </span>
        );
      case 'Processing':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200">
            <Truck className="w-3.5 h-3.5" /> Processing
          </span>
        );
      case 'Completed':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
            <CheckCircle2 className="w-3.5 h-3.5" /> Completed
          </span>
        );
      case 'Cancelled':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-red-50 text-red-700 border border-red-200">
            <XCircle className="w-3.5 h-3.5" /> Cancelled
          </span>
        );
    }
  };

  const parseProductsJSON = (jsonString: string) => {
    try {
      return JSON.parse(jsonString);
    } catch (e) {
      return [];
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        
        {/* Header Title Section */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight flex items-center gap-2">
              <span>Admin Order Desk</span>
              <span className="text-xs bg-slate-900 text-slate-100 font-mono tracking-widest px-2.5 py-1 rounded uppercase">D1 Secure Backend</span>
            </h1>
            <p className="text-slate-500 text-sm mt-1">Review orders records, track customer payments, and update live package status logs.</p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={createTestOrder}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-4 py-2.5 rounded-xl border border-emerald-500 text-xs uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer"
            >
              <PlusCircle className="w-4 h-4 shrink-0" />
              Seed Test Order
            </button>
            <Link
              href="/admin/test-email"
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-4 py-2.5 rounded-xl border border-indigo-500 text-xs uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer"
            >
              <Mail className="w-4 h-4 shrink-0" />
              Test Resend
            </Link>
            <button 
              onClick={() => fetchOrders(true)}
              disabled={refreshing}
              className="bg-white hover:bg-slate-50 text-slate-800 font-bold px-4 py-2.5 rounded-xl border border-slate-200 text-xs uppercase tracking-wide flex items-center gap-2 transition-all cursor-pointer"
            >
              <RefreshCw className={`w-4 h-4 shrink-0 ${refreshing ? 'animate-spin' : ''}`} />
              Refresh
            </button>
            <button 
              onClick={handleLogout}
              className="bg-red-50 hover:bg-red-100 text-red-700 font-bold px-4 py-2.5 rounded-xl border border-red-200 text-xs uppercase tracking-wide flex items-center gap-2 transition-all cursor-pointer"
            >
              <LogOut className="w-4 h-4 shrink-0" />
              Sign Out
            </button>
          </div>
        </div>

        {/* Search, Filter, Sort Controls Panel */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm mb-6 flex flex-col md:flex-row items-center gap-4">
          {/* Search bar */}
          <div className="relative w-full md:flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input 
              type="text" 
              placeholder="Search by code, customer name, or email..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-800 transition-all font-semibold"
            />
          </div>

          {/* Filter Status */}
          <div className="flex items-center gap-2 w-full md:w-auto">
            <Filter className="text-slate-400 w-4 h-4 shrink-0" />
            <select
              value={statusFilter}
              onChange={e => setStatusFilter(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/10 transition-all font-semibold text-slate-700 shrink-0 select-none"
            >
              <option value="All">All statuses</option>
              <option value="Pending">Pending</option>
              <option value="Processing">Processing</option>
              <option value="Completed">Completed</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>

          {/* Sort Selection */}
          <div className="flex items-center gap-2 w-full md:w-auto">
            <ArrowUpDown className="text-slate-400 w-4 h-4 shrink-0" />
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/10 transition-all font-semibold text-slate-700 shrink-0 select-none"
            >
              <option value="date_desc">Newest orders</option>
              <option value="date_asc">Oldest orders</option>
              <option value="value_desc">Highest total</option>
              <option value="value_asc">Lowest total</option>
            </select>
          </div>
        </div>

        {/* Orders Table/Block lists */}
        {loading ? (
          <div className="bg-white rounded-3xl border border-slate-200/85 p-20 text-center">
            <RefreshCw className="w-10 h-10 animate-spin text-slate-400 mx-auto mb-4" />
            <p className="text-slate-500 text-sm font-semibold">Pulling records from database. Please wait...</p>
          </div>
        ) : sortedOrders.length === 0 ? (
          <div className="bg-white rounded-3xl border border-slate-200/85 p-16 text-center">
            <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <ShoppingBag className="w-8 h-8 text-slate-400" />
            </div>
            <h3 className="text-lg font-bold text-slate-800 mb-1">No Orders Found</h3>
            <p className="text-slate-550 text-xs max-w-sm mx-auto mb-4">
              {orders.length === 0 
                ? 'No checkout orders are logged in SQLite store yet. Seed a test checkout request or place a dummy order!'
                : 'No orders match your chosen filters or search constraints.'}
            </p>
            {orders.length === 0 && (
              <button 
                onClick={createTestOrder}
                className="bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs px-5 py-2.5 rounded-xl uppercase tracking-wider transition-all cursor-pointer"
              >
                Create Instant Dummy Order
              </button>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            {sortedOrders.map((order) => {
              const isExpanded = expandedOrder === order.order_number;
              const productItems = parseProductsJSON(order.products);
              const orderDate = new Date(order.created_at).toLocaleDateString(undefined, {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              });

              return (
                <div 
                  key={order.order_number}
                  className="bg-white rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition-all overflow-hidden"
                >
                  {/* Summary Block Header */}
                  <div 
                    onClick={() => setExpandedOrder(isExpanded ? null : order.order_number)}
                    className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer select-none"
                  >
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="font-mono text-sm font-black text-slate-800">#{order.order_number}</span>
                      <span className="text-xs text-slate-400 font-semibold">{orderDate}</span>
                      {getStatusBadge(order.status)}
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-6">
                      <div className="text-right">
                        <span className="block text-[10px] text-slate-400 font-black uppercase tracking-wider">ORDER VALUE</span>
                        <span className="text-base font-black text-emerald-600">${order.total_amount.toFixed(2)} AUD</span>
                      </div>

                      <div className="shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-slate-50 text-slate-500 border border-slate-150">
                        <ChevronDown className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                      </div>
                    </div>
                  </div>

                  {/* Expanded Detail Action Area */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="border-t border-slate-100 bg-slate-50/50"
                      >
                        <div className="p-6 grid grid-cols-1 md:grid-cols-12 gap-6">
                          
                          {/* Col 1: Customer Contact + Shipping Address */}
                          <div className="md:col-span-4 space-y-4">
                            <div>
                              <h4 className="text-[10px] uppercase font-black tracking-wider text-slate-400 mb-2">Customer Profile</h4>
                              <p className="text-sm font-bold text-slate-900">{order.first_name} {order.last_name}</p>
                              <a href={`mailto:${order.email}`} className="text-xs font-semibold text-emerald-600 hover:underline block mt-1">{order.email}</a>
                              <p className="text-xs font-semibold text-slate-600 mt-1">{order.phone}</p>
                            </div>

                            <div>
                              <h4 className="text-[10px] uppercase font-black tracking-wider text-slate-400 mb-2 flex items-center gap-1">
                                <MapPin className="w-3.5 h-3.5 text-slate-450" />
                                <span>Shipping destination</span>
                              </h4>
                              <p className="text-xs font-semibold text-slate-700 leading-relaxed white-space-pre-line">{order.shipping_address}</p>
                              <p className="text-xs font-bold text-slate-800 mt-1.5">{order.state_region}, {order.country}</p>
                            </div>
                          </div>

                          {/* Col 2: Shipping Method + Payment Option */}
                          <div className="md:col-span-4 space-y-4">
                            <div>
                              <h4 className="text-[10px] uppercase font-black tracking-wider text-slate-400 mb-2 flex items-center gap-1">
                                <Truck className="w-3.5 h-3.5 text-slate-450" />
                                <span>Shipping logistics</span>
                              </h4>
                              <p className="text-xs font-bold text-slate-700">{order.shipping_method}</p>
                              <p className="text-xs text-slate-500 font-semibold mt-0.5">Shipping cost: ${order.shipping_cost.toFixed(2)} AUD</p>
                            </div>

                            <div>
                              <h4 className="text-[10px] uppercase font-black tracking-wider text-slate-400 mb-2 flex items-center gap-1">
                                <CreditCard className="w-3.5 h-3.5 text-slate-450" />
                                <span>Preferred payment channel</span>
                              </h4>
                              <p className="text-xs font-extrabold text-slate-800">{order.payment_method}</p>
                              {order.notes && (
                                <div className="mt-3 bg-white p-3 rounded-xl border border-slate-200">
                                  <span className="block text-[8px] font-black uppercase text-amber-600 tracking-wider mb-1">ORDER NOTES</span>
                                  <p className="text-xs font-semibold text-slate-600 italic">&quot;{order.notes}&quot;</p>
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Col 3: Status Changer Controls */}
                          <div className="md:col-span-4 bg-white p-4 rounded-xl border border-slate-200 text-center">
                            <h4 className="text-[10px] uppercase font-black tracking-wider text-slate-400 mb-3 block">Update Live Status</h4>
                            
                            <div className="grid grid-cols-2 gap-2 text-xs">
                              {['Pending', 'Processing', 'Completed', 'Cancelled'].map((st) => {
                                const isActive = order.status === st;
                                return (
                                  <button
                                    key={st}
                                    disabled={statusUpdating === order.order_number}
                                    onClick={() => handleStatusUpdate(order.order_number, st as any)}
                                    className={`py-2 px-3 rounded-lg font-bold uppercase tracking-wider transition-all cursor-pointer ${
                                      isActive 
                                        ? st === 'Completed' ? 'bg-emerald-600 text-white border border-emerald-500 shadow-sm' 
                                          : st === 'Pending' ? 'bg-amber-500 text-white border border-amber-400 shadow-sm' 
                                          : st === 'Processing' ? 'bg-blue-600 text-white border border-blue-500 shadow-sm' 
                                          : 'bg-red-600 text-white border border-red-500 shadow-sm'
                                        : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200'
                                    }`}
                                  >
                                    {st}
                                  </button>
                                );
                              })}
                            </div>
                          </div>

                        </div>

                        {/* Expandable item rows list */}
                        <div className="bg-slate-100/50 p-6 border-t border-slate-200/60">
                          <h4 className="text-[10px] uppercase font-black tracking-wider text-slate-400 mb-3">Itemized Packs Ordered</h4>
                          <div className="space-y-4">
                            {productItems.map((item: any) => (
                              <div key={`${item.id}-${item.variationName}`} className="flex justify-between items-center text-xs bg-white p-3.5 rounded-xl border border-slate-150">
                                <div>
                                  <span className="font-bold text-slate-805 block text-sm">{item.name}</span>
                                  {item.variationName && (
                                    <span className="text-[10px] text-slate-400 font-semibold italic block mt-0.5">Size/Variation: {item.variationName}</span>
                                  )}
                                </div>
                                <div className="text-right font-semibold text-slate-700">
                                  <span>{item.quantity} x ${item.price.toFixed(2)} AUD</span>
                                  <span className="block font-black text-slate-900 mt-0.5">${(item.price * item.quantity).toFixed(2)} AUD</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                      </motion.div>
                    )}
                  </AnimatePresence>

                </div>
              );
            })}
          </div>
        )}

      </div>
    </div>
  );
}
