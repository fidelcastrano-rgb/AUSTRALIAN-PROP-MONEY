'use client';

import { useState } from 'react';
import { useCart } from '@/components/shared/CartProvider';
import Link from 'next/link';

export default function CheckoutPage() {
  const { items, cartTotal, clearCart } = useCart();
  const [paymentMethod, setPaymentMethod] = useState('crypto');
  
  // Example form state
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) {
      alert('Your cart is empty');
      return;
    }
    
    // Construct WhatsApp message
    const itemsList = items.map(i => `${i.quantity}x ${i.name} ($${i.price})`).join('%0A');
    const message = `*New Order*%0A%0A*Items:*%0A${itemsList}%0A%0A*Total:* $${cartTotal.toFixed(2)}%0A*Payment Method:* ${paymentMethod}%0A%0A*Shipping Info:*%0A${first} ${last}%0A${email}%0A${phone}%0A${address}`;
    window.open(`https://wa.me/33753827675?text=${message}`, '_blank');
    
    // Can also submit a real form via api route, empty cart
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
                {items.map(item => (
                  <li key={item.id} className="flex justify-between text-sm text-slate-700">
                    <span>{item.quantity} × {item.name}</span>
                    <span className="font-bold">${(Number(item.price) * item.quantity).toFixed(2)}</span>
                  </li>
                ))}
              </ul>
              <div className="flex justify-between items-center pt-2 border-t border-slate-200">
                <span className="text-slate-900 font-bold">Total:</span>
                <span className="text-banknote-green font-black text-xl">${cartTotal.toFixed(2)}</span>
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

            <div className="pt-6">
              <button type="submit" className="w-full bg-banknote-navy hover:bg-banknote-green text-white font-bold py-4 px-8 rounded-md transition-colors text-lg shadow-lg uppercase tracking-wider">
                Place Order via WhatsApp
              </button>
              <p className="text-center text-sm text-slate-500 mt-4">
                Orders can also be placed directly via <a href="mailto:info@propcounterfeitnotes.com" className="text-banknote-green hover:underline font-bold">Email</a> or <a href="https://wa.me/33753827675" className="text-banknote-green hover:underline font-bold" target="_blank" rel="noopener noreferrer">WhatsApp</a>.
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
