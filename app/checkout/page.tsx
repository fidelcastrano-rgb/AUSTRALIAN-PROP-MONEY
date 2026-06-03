'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function CheckoutPage() {
  const [orderTotal, setOrderTotal] = useState(150);
  const [paymentMethod, setPaymentMethod] = useState('crypto');

  // For orders below 150, only Crypto is allowed
  const allOptionsAvailable = orderTotal >= 150;
  
  if (!allOptionsAvailable && paymentMethod !== 'crypto') {
    setPaymentMethod('crypto');
  }

  return (
    <div className="bg-brand-gray min-h-screen py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-black text-banknote-navy mb-8">Checkout & Order Builder</h1>
        
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8">
          <form className="space-y-8" onSubmit={(e) => { e.preventDefault(); alert('Order submitted! We will contact you shortly.'); }}>
            {/* Mock Cart Total for Demo Purposes */}
            <div className="bg-slate-50 p-6 rounded-lg border border-slate-200">
              <h2 className="text-lg font-bold text-banknote-navy mb-4">Order Summary</h2>
              <div className="flex justify-between items-center mb-4">
                <span className="text-slate-600">Mock Order Total (Adjust to see payment options):</span>
                <select 
                  className="border border-slate-300 rounded px-3 py-2 text-sm"
                  value={orderTotal}
                  onChange={(e) => setOrderTotal(Number(e.target.value))}
                >
                  <option value={90}>$90.00 (Below $150)</option>
                  <option value={150}>$150.00 (Standard Order)</option>
                  <option value={500}>$500.00 (Bulk Order)</option>
                </select>
              </div>
            </div>

            {/* Shipping Information */}
            <div>
              <h2 className="text-2xl font-bold text-banknote-navy mb-4 border-b border-slate-200 pb-2">Shipping Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">First Name</label>
                  <input required type="text" className="w-full border border-slate-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-banknote-green focus:border-transparent" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Last Name</label>
                  <input required type="text" className="w-full border border-slate-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-banknote-green focus:border-transparent" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
                  <input required type="email" className="w-full border border-slate-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-banknote-green focus:border-transparent" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-slate-700 mb-1">Phone Number / WhatsApp</label>
                  <input required type="text" className="w-full border border-slate-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-banknote-green focus:border-transparent" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-slate-700 mb-1">Shipping Address</label>
                  <textarea required rows={3} className="w-full border border-slate-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-banknote-green focus:border-transparent"></textarea>
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
                Place Order
              </button>
              <p className="text-center text-sm text-slate-500 mt-4">
                Orders can also be placed directly via <a href="mailto:info@propcounterfeitnotes.com" className="text-banknote-green hover:underline">Email</a> or <a href="https://wa.me/33753827675" className="text-banknote-green hover:underline" target="_blank" rel="noopener noreferrer">WhatsApp</a>.
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
