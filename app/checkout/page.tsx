'use client';

import { useState } from 'react';
import { useCart } from '@/components/shared/CartProvider';
import Link from 'next/link';
import { getDiscountedUnitPrice } from '@/lib/utils';

const shippingMethods = [
  { id: 'au_standard', name: 'Australia Standard (Tracked Secure Post)', price: 15.00, destination: 'Australia' },
  { id: 'au_express', name: 'Australia Express (Overnight Priority Courier)', price: 25.00, destination: 'Australia' }
];

export default function CheckoutPage() {
  const { items, cartTotal, clearCart } = useCart();
  const [paymentMethod, setPaymentMethod] = useState('crypto');
  const [selectedShipping, setSelectedShipping] = useState(shippingMethods[0]);
  const [submitType, setSubmitType] = useState<'whatsapp' | 'email'>('whatsapp');
  
  // Form state
  const [first, setFirst] = useState('');
  const [last, setLast] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');

  // For orders below 150, only Crypto is allowed
  const allOptionsAvailable = cartTotal >= 150;
  
  if (!allOptionsAvailable && paymentMethod !== 'crypto') {
    setPaymentMethod('crypto');
  }

  const grandTotal = cartTotal + selectedShipping.price;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) {
      alert('Your cart is empty');
      return;
    }
    
    if (submitType === 'whatsapp') {
      // Construct WhatsApp message
      const itemsList = items.map(i => {
        const discountedUnit = getDiscountedUnitPrice(i.price, i.quantity);
        const varText = i.variationName ? ` [${i.variationName}]` : '';
        return `- ${i.quantity}x ${i.name}${varText} (@$${discountedUnit.toFixed(2)}/pkg = $${(discountedUnit * i.quantity).toFixed(2)})`;
      }).join('%0A');

      const message = `*New Order details*%0A%0A` +
        `*Items purchased:*%0A${itemsList}%0A%0A` +
        `*Goods Subtotal:* $${cartTotal.toFixed(2)}%0A` +
        `*Shipping Destination:* ${selectedShipping.destination}%0A` +
        `*Shipping Method:* ${selectedShipping.name} ($${selectedShipping.price.toFixed(2)})%0A` +
        `*Grand Total:* $${grandTotal.toFixed(2)}%0A` +
        `*Preferred Payment:* ${paymentMethod === 'crypto' ? 'Cryptocurrency' : paymentMethod === 'bank' ? 'Bank Transfer' : 'Credit Card'}%0A%0A` +
        `*Contact/Delivery details:*%0A` +
        `Name: ${first} ${last}%0A` +
        `Email: ${email}%0A` +
        `Phone/WhatsApp: ${phone}%0A` +
        `Shipping Address: ${address}`;

      window.open(`https://wa.me/447341056054?text=${message}`, '_blank');
    } else {
      // Construct Email message
      const itemsListText = items.map(i => {
        const discountedUnit = getDiscountedUnitPrice(i.price, i.quantity);
        const varText = i.variationName ? ` [${i.variationName}]` : '';
        return `- ${i.quantity}x ${i.name}${varText} (@$${discountedUnit.toFixed(2)}/pkg = $${(discountedUnit * i.quantity).toFixed(2)})`;
      }).join('\n');

      const emailSubject = `New Prop Money Order from ${first} ${last}`;
      const emailBody = `New Order details\n\n` +
        `Items purchased:\n${itemsListText}\n\n` +
        `Goods Subtotal: $${cartTotal.toFixed(2)}\n` +
        `Shipping Destination: ${selectedShipping.destination}\n` +
        `Shipping Method: ${selectedShipping.name} ($${selectedShipping.price.toFixed(2)})\n` +
        `Grand Total: $${grandTotal.toFixed(2)}\n` +
        `Preferred Payment: ${paymentMethod === 'crypto' ? 'Cryptocurrency' : paymentMethod === 'bank' ? 'Bank Transfer' : 'Credit Card'}\n\n` +
        `Contact/Delivery details:\n` +
        `Name: ${first} ${last}\n` +
        `Email: ${email}\n` +
        `Phone/WhatsApp: ${phone}\n` +
        `Shipping Address: ${address}`;

      const mailtoUrl = `mailto:info@australianpropsmoney.com?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
      window.location.href = mailtoUrl;
    }
    
    // Empty cart post-handoff
    clearCart();
  };

  if (items.length === 0) {
    return (
      <div className="bg-brand-gray min-h-[60vh] py-16 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-black text-banknote-navy mb-4">Checkout</h1>
          <p className="text-slate-600 mb-8">Your cart is empty. You need to add items before checking out.</p>
          <Link href="/products" className="bg-banknote-navy hover:bg-banknote-green text-white font-bold py-3 px-6 rounded-md transition-colors shadow-lg">
            Return to Shop
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-brand-gray min-h-screen py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-black text-banknote-navy mb-8">Checkout & Order Builder</h1>
        
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8">
          <form className="space-y-8" onSubmit={handleSubmit}>
            {/* Cart Total */}
            <div className="bg-slate-50 p-6 rounded-lg border border-slate-200">
              <h2 className="text-lg font-bold text-banknote-navy mb-4 border-b border-slate-200 pb-2">Order Summary</h2>
              
              <ul className="mb-4 space-y-2">
                {items.map(item => {
                  const itemUnitPrice = getDiscountedUnitPrice(item.price, item.quantity);
                  const isDiscounted = itemUnitPrice < Number(item.price);

                  return (
                    <li key={item.id} className="flex justify-between text-sm text-slate-700">
                      <div className="flex flex-col">
                        <span className="font-bold">{item.quantity} × {item.name}</span>
                        {item.variationName && (
                          <span className="text-xs text-slate-500 font-semibold italic">Size: {item.variationName}</span>
                        )}
                        {isDiscounted && (
                          <span className="text-[10px] font-bold text-red-500 uppercase mt-0.5">Bulk wholesale rate configured</span>
                        )}
                      </div>
                      <span className="font-bold text-slate-900">${(itemUnitPrice * item.quantity).toFixed(2)}</span>
                    </li>
                  );
                })}
              </ul>

              <div className="border-t border-slate-200 pt-3 space-y-2">
                <div className="flex justify-between items-center text-sm text-slate-600">
                  <span>Subtotal:</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center text-sm text-slate-600">
                  <span>Selected Shipping rate:</span>
                  <span>+${selectedShipping.price.toFixed(2)} ({selectedShipping.destination})</span>
                </div>
              </div>

              <div className="flex justify-between items-center pt-3 border-t border-slate-200 mt-3">
                <span className="text-slate-900 font-bold">Total:</span>
                <span className="text-banknote-green font-black text-2xl">${grandTotal.toFixed(2)}</span>
              </div>
            </div>

            {/* Shipping Information */}
            <div>
              <h2 className="text-2xl font-bold text-banknote-navy mb-4 border-b border-slate-200 pb-2">Shipping Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">First Name</label>
                  <input required value={first} onChange={e => setFirst(e.target.value)} type="text" className="w-full border border-slate-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-banknote-green focus:border-transparent" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Last Name</label>
                  <input required value={last} onChange={e => setLast(e.target.value)} type="text" className="w-full border border-slate-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-banknote-green focus:border-transparent" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
                  <input required value={email} onChange={e => setEmail(e.target.value)} type="email" className="w-full border border-slate-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-banknote-green focus:border-transparent" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-slate-700 mb-1">Phone Number / WhatsApp</label>
                  <input required value={phone} onChange={e => setPhone(e.target.value)} type="text" className="w-full border border-slate-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-banknote-green focus:border-transparent" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-slate-700 mb-1">Shipping Address</label>
                  <textarea required value={address} onChange={e => setAddress(e.target.value)} rows={3} className="w-full border border-slate-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-banknote-green focus:border-transparent"></textarea>
                </div>
              </div>
            </div>

            {/* Shipping Region Options */}
            <div>
              <h2 className="text-2xl font-bold text-banknote-navy mb-4 border-b border-slate-200 pb-2">Select Shipping Destination & Method</h2>
              <p className="text-xs text-slate-500 mb-4 font-medium uppercase tracking-wider bg-slate-100 p-2.5 rounded border border-slate-250 font-bold text-emerald-800">
                Notice: We ship exclusively within Australia. All orders are packed in double vacuum stealth packaging for maximum on-set privacy and security.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {shippingMethods.map((method) => {
                  const isSelected = selectedShipping.id === method.id;
                  return (
                    <label 
                      key={method.id} 
                      className={`flex items-start p-3 border rounded-lg cursor-pointer transition-all ${
                        isSelected 
                          ? 'border-banknote-green bg-emerald-50/50 shadow-sm ring-1 ring-banknote-green' 
                          : 'border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      <input 
                        type="radio" 
                        name="shipping_method" 
                        value={method.id} 
                        checked={isSelected}
                        onChange={() => setSelectedShipping(method)}
                        className="mt-1 text-banknote-green focus:ring-banknote-green shrink-0"
                      />
                      <div className="ml-3">
                        <span className="block text-xs font-bold text-slate-900 leading-snug">{method.name}</span>
                        <span className="block text-sm font-black text-banknote-green mt-1">${method.price.toFixed(2)}</span>
                        <span className="inline-block text-[10px] font-bold uppercase py-0.5 px-2 bg-slate-100 text-slate-600 rounded-full mt-1.5 border border-slate-200">
                          {method.destination}
                        </span>
                      </div>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Payment Options */}
            <div>
              <h2 className="text-2xl font-bold text-banknote-navy mb-4 border-b border-slate-200 pb-2">Payment Method</h2>
              
              {!allOptionsAvailable && (
                <div className="mb-4 bg-yellow-50 text-yellow-800 p-4 rounded-md border border-yellow-200 text-sm">
                  <strong>Notice:</strong> For orders below $150, only Crypto payments are accepted.
                </div>
              )}

              <div className="space-y-3">
                <label className="flex items-start p-4 border border-slate-200 rounded-md cursor-pointer hover:bg-slate-50 transition-colors">
                  <input 
                    type="radio" 
                    name="payment" 
                    value="crypto" 
                    checked={paymentMethod === 'crypto'}
                    onChange={() => setPaymentMethod('crypto')}
                    className="mt-1 text-banknote-green focus:ring-banknote-green" 
                  />
                  <div className="ml-3">
                    <span className="block font-bold text-slate-900">Cryptocurrency (Bitcoin, USDT, etc.)</span>
                    <span className="block text-sm text-slate-500">Fast, secure, and completely anonymous. Recommended for all order sizes.</span>
                  </div>
                </label>

                {allOptionsAvailable && (
                  <>
                    <label className="flex items-start p-4 border border-slate-200 rounded-md cursor-pointer hover:bg-slate-50 transition-colors">
                      <input 
                        type="radio" 
                        name="payment" 
                        value="bank" 
                        checked={paymentMethod === 'bank'}
                        onChange={() => setPaymentMethod('bank')}
                        className="mt-1 text-banknote-green focus:ring-banknote-green" 
                      />
                      <div className="ml-3">
                        <span className="block font-bold text-slate-900">Bank Transfer</span>
                        <span className="block text-sm text-slate-500">Traditional bank wire or local transfer.</span>
                      </div>
                    </label>

                    <label className="flex items-start p-4 border border-slate-200 rounded-md cursor-pointer hover:bg-slate-50 transition-colors">
                      <input 
                        type="radio" 
                        name="payment" 
                        value="credit_card" 
                        checked={paymentMethod === 'credit_card'}
                        onChange={() => setPaymentMethod('credit_card')}
                        className="mt-1 text-banknote-green focus:ring-banknote-green" 
                      />
                      <div className="ml-3">
                        <span className="block font-bold text-slate-900">Credit Card</span>
                        <span className="block text-sm text-slate-500">Secure credit or debit card processing.</span>
                      </div>
                    </label>
                  </>
                )}
              </div>

              {(paymentMethod === 'bank' || paymentMethod === 'credit_card' || paymentMethod === 'crypto') && (
                <div className="mt-4 bg-slate-100 p-4 rounded-md text-sm text-slate-700 border border-slate-200">
                  {paymentMethod === 'crypto' && <strong>Note:</strong>}
                  {(paymentMethod === 'bank' || paymentMethod === 'credit_card') && <strong>Note:</strong>} We will send our {paymentMethod === 'crypto' ? 'crypto wallet address' : paymentMethod === 'bank' ? 'bank transfer details' : 'payment link'} via email/WhatsApp once we receive your order.
                </div>
              )}
            </div>

            <div className="pt-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button 
                  type="submit" 
                  onClick={() => setSubmitType('whatsapp')}
                  className="w-full bg-[#25D366] hover:bg-[#20ba5a] text-white font-black py-4 px-6 rounded-xl transition-all text-base shadow-md uppercase tracking-wider flex items-center justify-center gap-2 hover:shadow-lg active:scale-[0.99] cursor-pointer"
                >
                  <svg className="w-5 h-5 fill-current shrink-0" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.003 5.324 5.328 0 11.896 0c3.181.001 6.171 1.242 8.425 3.499 2.253 2.257 3.491 5.253 3.488 8.435-.006 6.571-5.33 11.895-11.898 11.895-1.99-.001-3.94-.502-5.67-1.458L0 24zm6.071-4.713c1.649.979 3.26 1.488 5.093 1.489 5.378 0 9.754-4.364 9.758-9.735.002-2.599-1.01-5.048-2.852-6.892-1.842-1.846-4.292-2.862-6.883-2.863-5.388 0-9.761 4.366-9.766 9.739-.001 1.905.5 3.754 1.453 5.362l-.954 3.483 3.564-.936zM17.13 14.88c-.287-.144-1.701-.84-1.964-.936-.263-.096-.454-.144-.645.144-.191.288-.741.936-.908 1.127-.168.19-.335.216-.622.072-.287-.144-1.212-.447-2.309-1.425-.853-.762-1.43-1.702-1.597-1.99-.168-.288-.018-.444.125-.587.13-.129.288-.336.431-.504.144-.168.191-.288.287-.48.096-.192.048-.361-.024-.504-.072-.144-.645-1.554-.884-2.128-.233-.559-.47-.482-.645-.491l-.551-.008c-.191 0-.501.072-.763.36-.263.288-1.002.979-1.002 2.388 0 1.41 1.026 2.769 1.169 2.961.144.192 2.02 3.085 4.894 4.329.684.296 1.219.473 1.637.605.687.218 1.313.187 1.808.113.551-.082 1.701-.696 1.94-.368.239-.624.239-1.152.167-1.248-.072-.096-.263-.144-.551-.288z" />
                  </svg>
                  Order via WhatsApp
                </button>

                <button 
                  type="submit" 
                  onClick={() => setSubmitType('email')}
                  className="w-full bg-banknote-navy hover:bg-banknote-green text-white font-black py-4 px-6 rounded-xl transition-all text-base shadow-md uppercase tracking-wider flex items-center justify-center gap-2 hover:shadow-lg active:scale-[0.99] cursor-pointer"
                >
                  <svg className="w-5 h-5 fill-none stroke-current stroke-2 shrink-0" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="20" height="16" x="2" y="4" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                  Order via Email
                </button>
              </div>
              <p className="text-center text-xs text-slate-500 pt-2 font-semibold">
                By placing an order, you agree to our terms of compliance and reproduction rules.
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
