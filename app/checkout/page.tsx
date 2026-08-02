'use client';

import { useState, useEffect } from 'react';
import { useCart } from '@/components/shared/CartProvider';
import Link from 'next/link';
import { getDiscountedUnitPrice } from '@/lib/utils';
import { motion, AnimatePresence } from 'motion/react';
import { 
  CheckCircle, 
  AlertTriangle, 
  CreditCard, 
  ArrowRight, 
  Sparkles, 
  ShieldAlert, 
  Truck, 
  Bitcoin, 
  X, 
  ShoppingBag,
  Coins,
  Send,
  MessageSquare
} from 'lucide-react';

const shippingMethods = [
  { id: 'local_au', name: 'Local Shipping (Australia)', price: 10.00, destination: 'Australia Only' },
  { id: 'normal', name: 'Normal Fast Shipping', price: 20.00, destination: 'All Regions' },
  { id: 'same_day', name: 'Same Day Processing & Dispatch', price: 40.00, destination: 'Capital Cities Only' },
  { id: 'international', name: 'International Courier Shipping', price: 50.00, destination: 'Outside Australia' }
];

export default function CheckoutPage() {
  const { items, cartTotal, clearCart } = useCart();
  
  // Step navigation or confirmation screen
  const [orderComplete, setOrderComplete] = useState(false);
  const [completeOrderNumber, setCompleteOrderNumber] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Form Fields
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [shippingAddress, setShippingAddress] = useState('');
  const [country, setCountry] = useState('Australia');
  const [stateRegion, setStateRegion] = useState('');
  const [notes, setNotes] = useState('');

  // Shipping & Payment selection
  const [selectedShipping, setSelectedShipping] = useState(shippingMethods[0]);
  const [paymentMethod, setPaymentMethod] = useState('crypto');

  // Handle dynamic payment options depending on country
  const getPaymentOptions = (selectedCountry = country) => {
    // Base crypto available everywhere
    const cryptoOption = {
      id: 'crypto',
      label: 'Cryptocurrency (Fastest & Preferred)',
      description: 'Bitcoin (BTC), USDT, USDC, or Ethereum (ETH).'
    };
    const cardOption = {
      id: 'credit_card',
      label: 'Credit / Debit Card',
      description: 'Processed securely via our private merchant loop.'
    };

    if (selectedCountry === 'Australia') {
      return [
        cryptoOption,
        { id: 'payid', label: 'PayID', description: 'Fast, fee-free transfer to our registered PayID using any Australian bank app.' },
        cardOption
      ];
    } else if (selectedCountry === 'United States') {
      return [
        cryptoOption,
        { id: 'zelle', label: 'Zelle', description: 'Fast, fee-free transfer using Zelle Pay.' },
        { id: 'apple_cash', label: 'Apple Cash', description: 'Secure direct payment via Apple Cash mobile systems.' },
        { id: 'chime', label: 'Chime', description: 'Chime members account-to-account lightning transfer.' },
        cardOption
      ];
    } else if (selectedCountry === 'Canada') {
      return [
        cryptoOption,
        { id: 'e_transfer', label: 'Interac E-Transfer', description: 'Immediate electronic transfer via Interac.' },
        { id: 'paypal', label: 'PayPal (Friends & Family Only)', description: 'Fast payment through PayPal securely.' },
        cardOption
      ];
    } else {
      // All other countries
      return [
        cryptoOption,
        { id: 'bank_transfer', label: 'Bank Transfer (International WIRE)', description: 'Secure bank deposit to our currency handlers.' },
        { id: 'paypal', label: 'PayPal (Friends & Family Only)', description: 'Fast globally supported PayPal settlement.' },
        cardOption
      ];
    }
  };

  const handleCountryChange = (val: string) => {
    setCountry(val);
    
    // Choose local AU vs normal global shipping default immediately
    if (val === 'Australia') {
      setSelectedShipping(shippingMethods[0]);
    } else {
      setSelectedShipping(shippingMethods[1]);
    }

    // Force compatible currency/payment selection
    const list = getPaymentOptions(val);
    if (!list.some(opt => opt.id === paymentMethod)) {
      setPaymentMethod('crypto');
    }
  };

  const currentPaymentOptions = getPaymentOptions(country);

  const grandTotal = cartTotal + selectedShipping.price;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) return;

    setIsSubmitting(true);
    setErrorMessage('');

    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          phone,
          shippingAddress,
          country,
          stateRegion,
          notes,
          shippingMethod: selectedShipping.name,
          shippingCost: selectedShipping.price,
          paymentMethod: currentPaymentOptions.find(o => o.id === paymentMethod)?.label || paymentMethod,
          items: items.map(i => {
            const up = getDiscountedUnitPrice(i.price, i.quantity);
            return {
              id: i.id,
              name: i.name,
              price: up,
              quantity: i.quantity,
              variationName: i.variationName || ''
            };
          }),
          totalAmount: grandTotal
        })
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Server error occured');
      }

      // Success!
      setCompleteOrderNumber(data.orderNumber);
      setOrderComplete(true);
      clearCart();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err: any) {
      setErrorMessage(err?.message || 'Something went wrong during checkout. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (orderComplete) {
    return (
      <div id="order-success-screen" className="bg-slate-50 min-h-screen py-24 flex items-center justify-center">
        <div className="max-w-xl w-full mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-3xl border border-slate-200/80 shadow-2xl p-8 text-center relative overflow-hidden"
          >
            {/* Top decorative line */}
            <div className="absolute top-0 left-0 right-0 h-2 bg-emerald-500"></div>
            
            <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-12 h-12 text-emerald-500 animate-[bounce_1.5s_infinite]" />
            </div>

            <span className="inline-block text-xs font-black uppercase tracking-widest text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full mb-3">
              Order Registered Successfully
            </span>

            <h1 className="text-3xl font-black text-slate-900 mb-2">Thank You For Your Order!</h1>
            <p className="text-slate-500 text-sm max-w-sm mx-auto mb-6">
              Your cinematic prop bills order has been stored. Our specialized production coordinators are reviewing details.
            </p>

            <div className="bg-slate-50 border border-slate-150/70 rounded-2xl p-5 mb-6 text-left">
              <div className="flex justify-between items-center pb-3 border-b border-slate-200/80">
                <span className="text-xs text-slate-400 font-bold uppercase tracking-wide">ORDER CODE</span>
                <span className="font-mono text-base font-black text-slate-800">#{completeOrderNumber}</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-slate-200/80">
                <span className="text-xs text-slate-400 font-bold uppercase tracking-wide">SHIPPING VIA</span>
                <span className="text-xs font-black text-slate-700">{selectedShipping.name}</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-slate-200/80">
                <span className="text-xs text-slate-400 font-bold uppercase tracking-wide">PAYMENT ROUTE</span>
                <span className="text-xs font-black text-slate-700">
                  {currentPaymentOptions.find(o => o.id === paymentMethod)?.label || paymentMethod}
                </span>
              </div>
              <div className="flex justify-between items-center pt-3">
                <span className="text-xs text-slate-400 font-bold uppercase tracking-wide">GRAND TOTAL</span>
                <span className="text-base font-black text-emerald-600">${grandTotal.toFixed(2)} AUD</span>
              </div>
            </div>

            {/* Prompt alerts based on dynamic options */}
            <div className="space-y-3 mb-8">
              {paymentMethod === 'crypto' && (
                <div className="bg-emerald-50 border-l-4 border-emerald-500 p-4 rounded-r-xl text-left">
                  <div className="flex items-start gap-2.5">
                    <Bitcoin className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs font-black text-emerald-800 uppercase tracking-wider mb-1">Discreet Crypto Payment Instructions</h4>
                      <p className="text-xs text-emerald-700 leading-relaxed">
                        An email containing our specific BTC/USDT wallet deposit nodes is being sent immediately. To expedite wrapping, you can directly message us on WhatsApp with your Order Code.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {(paymentMethod === 'credit_card') && (
                <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-xl text-left">
                  <div className="flex items-start gap-2.5">
                    <CreditCard className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs font-black text-blue-800 uppercase tracking-wider mb-1">Secure Merchant Card Link</h4>
                      <p className="text-xs text-blue-700 leading-relaxed">
                        Our secure card payment link is generated after visual checklist validation. It will be sent via email or WhatsApp in less than 30 minutes.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {(paymentMethod === 'payid' || paymentMethod === 'bank_transfer' || paymentMethod === 'zelle' || paymentMethod === 'apple_cash' || paymentMethod === 'chime' || paymentMethod === 'e_transfer') && (
                <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-xl text-left">
                  <div className="flex items-start gap-2.5">
                    <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs font-black text-amber-800 uppercase tracking-wider mb-1">Quick Instructions Pending Review</h4>
                      <p className="text-xs text-amber-700 leading-relaxed">
                        Our verified direct transfer routes will be emailed or texted (WhatsApp) to you immediately once we accept and pack your secure bundle.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {paymentMethod === 'paypal' && (
                <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-xl text-left">
                  <div className="flex items-start gap-2.5">
                    <AlertTriangle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs font-black text-red-800 uppercase tracking-wider mb-1">Rules Notice</h4>
                      <p className="text-xs text-red-700 leading-relaxed">
                        PayPal Friends & Family payments only. Our recipient account notes will be instantly delivered via email or secure chat.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <a 
                href={`https://wa.me/61468187831?text=Hello! I just placed a prop order on your website. Order Code: #${completeOrderNumber}. Can you help me complete the payment?`}
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-[#25D366] hover:bg-[#1eba54] text-white font-bold py-3 px-5 rounded-2xl text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md hover:shadow-lg active:scale-95"
              >
                <MessageSquare className="w-4 h-4 shrink-0" />
                WhatsApp Agent Now
              </a>
              <Link 
                href="/products" 
                className="bg-slate-950 hover:bg-slate-800 text-white font-bold py-3 px-5 rounded-2xl text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4 shrink-0" />
                Return to Store
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Progress Alert Bar */}
        <div className="mb-8 flex flex-col md:flex-row items-center justify-between gap-4 bg-slate-900 text-white p-4 rounded-2xl border border-slate-800 shadow-xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-black uppercase tracking-wider">Fast-Track Production Engaged</p>
              <p className="text-[11px] text-slate-400">Order securely handled through Cloudflare D1 encrypted record loops.</p>
            </div>
          </div>
          <div className="text-xs font-mono bg-slate-800 px-3.5 py-1.5 rounded-lg border border-slate-700 text-slate-300">
            SECURE CHECKOUT SSL 256-BIT
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Main Billing Forms: Col 1-7 */}
          <div className="lg:col-span-7 space-y-8">
            <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm p-6 md:p-8">
              <h1 className="text-3xl font-black text-slate-900 tracking-tight mb-2">Secure Information Entry</h1>
              <p className="text-slate-500 text-xs uppercase tracking-wider font-semibold mb-8 border-b border-slate-100 pb-4">
                Please complete all fields carefully on screen.
              </p>

              {errorMessage && (
                <div className="mb-6 p-4 bg-red-50 text-red-800 rounded-xl border border-red-200 text-xs font-semibold flex items-center gap-2">
                  <ShieldAlert className="w-5 h-5 shrink-0 text-red-600" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Name fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-black text-slate-700 uppercase tracking-widest mb-1.5">First Name *</label>
                    <input 
                      required 
                      type="text" 
                      placeholder="Jane"
                      value={firstName} 
                      onChange={e => setFirstName(e.target.value)}
                      className="w-full bg-slate-50 hover:bg-slate-100/50 focus:bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all font-semibold"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-black text-slate-700 uppercase tracking-widest mb-1.5">Last Name *</label>
                    <input 
                      required 
                      type="text" 
                      placeholder="Doe"
                      value={lastName} 
                      onChange={e => setLastName(e.target.value)}
                      className="w-full bg-slate-50 hover:bg-slate-100/50 focus:bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all font-semibold"
                    />
                  </div>
                </div>

                {/* Contact Coordinates */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-black text-slate-700 uppercase tracking-widest mb-1.5">Email Address *</label>
                    <input 
                      required 
                      type="email" 
                      placeholder="jane.doe@example.com"
                      value={email} 
                      onChange={e => setEmail(e.target.value)}
                      className="w-full bg-slate-50 hover:bg-slate-100/50 focus:bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all font-semibold"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-black text-slate-700 uppercase tracking-widest mb-1.5">Phone / WhatsApp *</label>
                    <input 
                      required 
                      type="tel" 
                      placeholder="+61 485 989 180"
                      value={phone} 
                      onChange={e => setPhone(e.target.value)}
                      className="w-full bg-slate-50 hover:bg-slate-100/50 focus:bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all font-semibold"
                    />
                  </div>
                </div>

                {/* Country, State */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-black text-slate-700 uppercase tracking-widest mb-1.5">Country *</label>
                    <select
                      required
                      value={country}
                      onChange={e => handleCountryChange(e.target.value)}
                      className="w-full bg-slate-50 hover:bg-slate-100/50 focus:bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all font-semibold"
                    >
                      <option value="Australia">🇦🇺 Australia</option>
                      <option value="United States">🇺🇸 United States</option>
                      <option value="Canada">🇨🇦 Canada</option>
                      <option value="United Kingdom">🇬🇧 United Kingdom</option>
                      <option value="New Zealand">🇳🇿 New Zealand</option>
                      <option value="Global Other">🌍 Other Country</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-black text-slate-700 uppercase tracking-widest mb-1.5">State / Region / Territory *</label>
                    <input 
                      required 
                      type="text" 
                      placeholder="e.g. New South Wales / CA"
                      value={stateRegion} 
                      onChange={e => setStateRegion(e.target.value)}
                      className="w-full bg-slate-50 hover:bg-slate-100/50 focus:bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all font-semibold"
                    />
                  </div>
                </div>

                {/* Shipping Address */}
                <div>
                  <label className="block text-xs font-black text-slate-700 uppercase tracking-widest mb-1.5">Full Shipping Address *</label>
                  <textarea 
                    required 
                    rows={3}
                    placeholder="Enter street lines, city, postal code clearly to ensure accurate delivery"
                    value={shippingAddress} 
                    onChange={e => setShippingAddress(e.target.value)}
                    className="w-full bg-slate-50 hover:bg-slate-100/50 focus:bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all font-semibold"
                  />
                </div>

                {/* Notes */}
                <div>
                  <label className="block text-xs font-black text-slate-700 uppercase tracking-widest mb-1.5">Order Notes</label>
                  <textarea 
                    rows={2}
                    placeholder="E.g., custom denominations proportions, urgent studio shoot deadlines, package packing instructions..."
                    value={notes} 
                    onChange={e => setNotes(e.target.value)}
                    className="w-full bg-slate-50 hover:bg-slate-100/50 focus:bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all font-semibold"
                  />
                </div>

                {/* Shipping Methods Selection */}
                <div className="pt-4">
                  <h3 className="text-sm font-black text-slate-850 uppercase tracking-wider mb-4 flex items-center gap-2">
                    <Truck className="w-4 h-4 text-emerald-500" />
                    <span>Shipping Method</span>
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {shippingMethods.map((method) => {
                      const isSelected = selectedShipping.id === method.id;
                      return (
                        <label 
                          key={method.id} 
                          className={`flex items-start p-4 border rounded-2xl cursor-pointer transition-all ${
                            isSelected 
                              ? 'border-emerald-500 bg-emerald-50/40 ring-1 ring-emerald-500' 
                              : 'border-slate-200 hover:bg-slate-50'
                          }`}
                        >
                          <input 
                            type="radio" 
                            name="shipping" 
                            value={method.id} 
                            checked={isSelected}
                            onChange={() => setSelectedShipping(method)}
                            className="mt-1 text-emerald-600 focus:ring-emerald-500 shrink-0"
                          />
                          <div className="ml-3">
                            <span className="block text-xs font-bold text-slate-900 leading-snug">{method.name}</span>
                            <span className="block text-sm font-black text-emerald-600 mt-1">${method.price.toFixed(2)} AUD</span>
                            <span className="inline-block text-[10px] font-bold uppercase py-0.5 px-2 bg-slate-100 text-slate-600 rounded-full mt-1.5 border border-slate-200">
                              {method.destination}
                            </span>
                          </div>
                        </label>
                      );
                    })}
                  </div>
                </div>

                {/* Dynamic Payment Selection */}
                <div className="pt-4">
                  <h3 className="text-sm font-black text-slate-850 uppercase tracking-wider mb-3 flex items-center gap-2">
                    <Coins className="w-4 h-4 text-emerald-500" />
                    <span>Payment Method Options</span>
                  </h3>
                  
                  {/* Crypto preferred global card alert */}
                  <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200/60 rounded-2xl p-4 mb-4">
                    <div className="flex gap-3">
                      <Bitcoin className="w-6 h-6 text-emerald-600 shrink-0 animate-pulse mt-0.5" />
                      <div>
                        <p className="text-xs font-black text-emerald-800 uppercase tracking-widest">Crypto Preferred Payment Route</p>
                        <p className="text-[11px] text-emerald-700/90 leading-relaxed font-semibold mt-0.5">
                          &quot;Crypto is our preferred payment method for fast, secure and discreet ordering.&quot; We accept Bitcoin (BTC), USDT, USDC, and Ethereum.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Payment method radiogroup */}
                  <div className="space-y-3">
                    {currentPaymentOptions.map((opt) => {
                      const isSelected = paymentMethod === opt.id;
                      return (
                        <label 
                          key={opt.id} 
                          className={`flex items-start p-4 border rounded-2xl cursor-pointer transition-all ${
                            isSelected 
                              ? 'border-emerald-500 bg-emerald-50/40 ring-1 ring-emerald-500' 
                              : 'border-slate-200 hover:bg-slate-50'
                          }`}
                        >
                          <input 
                            type="radio" 
                            name="payment_opt" 
                            value={opt.id} 
                            checked={isSelected}
                            onChange={() => setPaymentMethod(opt.id)}
                            className="mt-1 text-emerald-600 focus:ring-emerald-500 shrink-0"
                          />
                          <div className="ml-3">
                            <span className="block text-xs font-bold text-slate-900 leading-snug">{opt.label}</span>
                            <span className="block text-[11px] text-slate-500 mt-1">{opt.description}</span>
                          </div>
                        </label>
                      );
                    })}
                  </div>

                  {/* Custom notices display */}
                  <AnimatePresence mode="wait">
                    {paymentMethod === 'credit_card' && (
                      <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-4 bg-blue-50/80 border border-blue-200 p-4 rounded-2xl"
                      >
                        <p className="text-xs text-blue-800 leading-relaxed font-bold">
                          💳 CREDIT CARD NOTICE: &quot;Our secure card payment link will be emailed or WhatsApped to you after we receive and review your order.&quot;
                        </p>
                      </motion.div>
                    )}

                    {paymentMethod === 'paypal' && (
                      <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-4 bg-red-50/80 border border-red-200 p-4 rounded-2xl"
                      >
                        <p className="text-xs text-red-800 leading-relaxed font-bold">
                          📣 PAYPAL NOTICE: &quot;PayPal Friends & Family payments only.&quot;
                        </p>
                      </motion.div>
                    )}

                    {(paymentMethod === 'zelle' || paymentMethod === 'apple_cash' || paymentMethod === 'chime') && (
                      <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-4 bg-amber-50/80 border border-amber-200 p-4 rounded-2xl"
                      >
                        <p className="text-xs text-amber-800 leading-relaxed font-bold">
                          🇺🇸 UNITED STATES PAYMENT NOTICE: &quot;This payment option will be emailed or WhatsApped to you once we receive and review your order.&quot;
                        </p>
                      </motion.div>
                    )}

                    {(paymentMethod === 'payid' || paymentMethod === 'bank_transfer') && (
                      <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-4 bg-amber-50/80 border border-amber-200 p-4 rounded-2xl"
                      >
                        <p className="text-xs text-amber-800 leading-relaxed font-bold">
                          🇦🇺 PAYID / TRANSFER NOTICE: &quot;This direct transfer option will be secure-packed and routes will be emailed or WhatsApped to you once we receive and review your order.&quot;
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>

                </div>

                {/* Submit Trigger */}
                <div className="pt-6">
                  <button
                    type="submit"
                    disabled={isSubmitting || items.length === 0}
                    className="w-full bg-slate-900 hover:bg-emerald-600 disabled:bg-slate-400 text-white font-black py-4 px-6 rounded-2xl transition-all uppercase tracking-wider text-sm flex items-center justify-center gap-2 shadow-lg hover:shadow-xl active:scale-[0.99] cursor-pointer"
                  >
                    <span>{isSubmitting ? 'Registering Order Loop...' : 'Generate Secure Order Now'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <p className="text-center text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-3">
                    By submitting, you authorize that these notes are for cinema, novelty, video production or educational uses only.
                  </p>
                </div>

              </form>
            </div>
          </div>
          
          {/* Order Summary Sidebar Panel: Col 8-12 */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-slate-900 text-white rounded-3xl border border-slate-800 p-6 md:p-8 sticky top-6 shadow-xl">
              <h2 className="text-xl font-black uppercase tracking-wider mb-6 pb-3 border-b border-slate-800 text-slate-100 flex items-center justify-between">
                <span>Summary Bag</span>
                <span className="text-xs bg-slate-800 text-emerald-400 px-3 py-1 rounded-full">{items.reduce((acc, i) => acc + i.quantity, 0)} Items</span>
              </h2>

              <ul className="mb-6 space-y-4 max-h-[300px] overflow-y-auto pr-2 scrollbar-thin">
                {items.map(item => {
                  const itemUnitPrice = getDiscountedUnitPrice(item.price, item.quantity);
                  const isDiscounted = itemUnitPrice < Number(item.price);

                  return (
                    <li key={item.id} className="flex justify-between items-start text-xs border-b border-slate-800/65 pb-4">
                      <div>
                        <span className="font-bold text-slate-200 block text-sm">{item.name}</span>
                        {item.variationName && (
                          <span className="text-[10px] text-slate-450 font-semibold italic mt-0.5 block">Size/Variation: {item.variationName}</span>
                        )}
                        <span className="text-[11px] text-slate-400 block mt-1">{item.quantity} x ${itemUnitPrice.toFixed(2)} AUD</span>
                        {isDiscounted && (
                          <span className="inline-block text-[8px] font-black tracking-widest uppercase bg-emerald-500/10 text-emerald-400 px-1.5 py-0.5 rounded mt-1.5">
                            Wholesale discount applied
                          </span>
                        )}
                      </div>
                      <span className="font-extrabold text-slate-200 text-sm">${(itemUnitPrice * item.quantity).toFixed(2)}</span>
                    </li>
                  );
                })}
              </ul>

              <div className="border-t border-slate-800 pt-4 space-y-3.5 text-xs text-slate-400">
                <div className="flex justify-between items-center">
                  <span>Cart Goods Subtotal:</span>
                  <span className="font-bold text-slate-200">${cartTotal.toFixed(2)} AUD</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Region Shipping Charge:</span>
                  <span className="font-bold text-slate-200">+${selectedShipping.price.toFixed(2)} AUD</span>
                </div>
                <div className="flex justify-between items-center text-[10px] uppercase font-bold tracking-widest bg-slate-800/40 p-2 rounded-lg border border-slate-800">
                  <span>Shipping Route:</span>
                  <span className="text-emerald-400">{selectedShipping.name}</span>
                </div>
              </div>

              <div className="border-t border-slate-800 pt-4 mt-4 flex justify-between items-center">
                <span className="text-sm font-black uppercase text-slate-300">Absolute Total</span>
                <span className="text-2xl font-black text-emerald-400">${grandTotal.toFixed(2)} AUD</span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
