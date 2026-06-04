'use client';

import { useCart } from '@/components/shared/CartProvider';
import Link from 'next/link';
import Image from 'next/image';
import { Trash2, ArrowRight, ShoppingBag } from 'lucide-react';
import { getDiscountedUnitPrice, getDiscountPercentage } from '@/lib/utils';

export default function CartPage() {
  const { items, updateQuantity, removeFromCart, cartTotal, cartCount } = useCart();

  if (cartCount === 0) {
    return (
      <div className="bg-brand-gray min-h-[60vh] py-16 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="bg-white p-6 rounded-full inline-block mb-6 shadow-sm">
            <ShoppingBag className="w-16 h-16 text-slate-300" />
          </div>
          <h1 className="text-3xl font-black text-banknote-navy mb-4 text-balance">Your cart is currently empty.</h1>
          <p className="text-slate-600 mb-8 text-lg">Before proceed to checkout you must add some products to your shopping cart.</p>
          <Link href="/products" className="inline-flex items-center justify-center bg-banknote-navy hover:bg-banknote-green text-white font-bold py-4 px-8 rounded-md transition-colors text-lg shadow-lg uppercase tracking-wider w-full sm:w-auto">
            Return to Shop
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-brand-gray min-h-screen py-10 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl md:text-4xl font-black text-banknote-navy mb-8">Shopping Cart</h1>
        
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1">
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="hidden md:grid grid-cols-12 gap-4 p-4 md:p-6 border-b border-slate-200 bg-slate-50 text-xs font-bold text-slate-500 uppercase tracking-widest">
                <div className="col-span-6">Product</div>
                <div className="col-span-2 text-center">Price</div>
                <div className="col-span-2 text-center">Quantity</div>
                <div className="col-span-2 text-right">Subtotal</div>
              </div>
              
              <div className="divide-y divide-slate-100">
                {items.map((item) => {
                  const discount = getDiscountPercentage(item.quantity);
                  const basePrice = Number(item.price);
                  const discountedPrice = getDiscountedUnitPrice(item.price, item.quantity);

                  return (
                    <div key={item.id} className="p-4 md:p-6 flex flex-col md:grid md:grid-cols-12 md:gap-4 md:items-center">
                      {/* Mobile layout */}
                      <div className="md:hidden flex items-start gap-4 mb-4">
                        <div className="relative w-20 h-20 bg-slate-100 rounded-md overflow-hidden shrink-0">
                          <Image src={item.image} alt={item.name} fill className="object-cover" referrerPolicy="no-referrer" />
                        </div>
                        <div className="flex-1">
                          <Link href={`/products/${item.slug || item.id}`} className="font-bold text-banknote-navy hover:text-banknote-green block text-base leading-tight mb-1">
                            {item.name}
                          </Link>
                          {item.variationName && (
                            <span className="block text-xs font-bold text-slate-500 mb-2 uppercase bg-slate-100 py-0.5 px-2 rounded w-fit">
                              Size: {item.variationName}
                            </span>
                          )}
                          {discount > 0 ? (
                            <div className="flex flex-col">
                              <span className="text-xs text-red-500 font-bold">Bulk Discount ({discount}% Off)</span>
                              <div className="flex items-center gap-1.5 mt-0.5">
                                <span className="font-bold text-banknote-green">${discountedPrice.toFixed(2)}</span>
                                <span className="text-xs text-slate-400 line-through">${basePrice.toFixed(2)}</span>
                              </div>
                            </div>
                          ) : (
                            <span className="font-bold text-slate-900">${basePrice.toFixed(2)}</span>
                          )}
                        </div>
                        <button onClick={() => removeFromCart(item.id)} className="text-slate-400 hover:text-red-500 p-2" aria-label="Remove item">
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>

                      {/* Desktop layout product cell */}
                      <div className="hidden md:flex md:col-span-6 items-center gap-4">
                        <button onClick={() => removeFromCart(item.id)} className="text-slate-400 hover:text-red-500 p-1" aria-label="Remove item">
                          <Trash2 className="w-5 h-5" />
                        </button>
                        <div className="relative w-20 h-20 bg-slate-100 rounded-md overflow-hidden shrink-0 border border-slate-200">
                          <Image src={item.image} alt={item.name} fill className="object-cover" referrerPolicy="no-referrer" />
                        </div>
                        <div className="flex flex-col">
                          <Link href={`/products/${item.slug || item.id}`} className="font-bold text-banknote-navy hover:text-banknote-green block text-base leading-snug">
                            {item.name}
                          </Link>
                          {item.variationName && (
                            <span className="block text-[11px] font-extrabold text-slate-500 mt-1 uppercase bg-slate-100/80 py-0.5 px-2 rounded w-fit">
                              Size: {item.variationName}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Desktop price cell */}
                      <div className="hidden md:flex md:flex-col md:col-span-2 text-center items-center justify-center">
                        {discount > 0 ? (
                          <>
                            <span className="text-[10px] text-red-500 font-extrabold uppercase leading-none mb-1">({discount}% Off)</span>
                            <div className="flex flex-col md:flex-row md:items-center gap-1">
                              <span className="font-bold text-banknote-green">${discountedPrice.toFixed(2)}</span>
                              <span className="text-xs text-slate-400 line-through">${basePrice.toFixed(2)}</span>
                            </div>
                          </>
                        ) : (
                          <span className="font-bold text-slate-900">${basePrice.toFixed(2)}</span>
                        )}
                      </div>

                      {/* Quantity cell (Mobile & Desktop) */}
                      <div className="md:col-span-2 flex items-center justify-between md:justify-center mt-2 md:mt-0">
                        <span className="md:hidden font-bold text-sm text-slate-500 uppercase">Quantity:</span>
                        <div className="flex items-center border border-slate-300 rounded bg-slate-50 overflow-hidden">
                          <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="px-3 py-1.5 text-slate-500 hover:text-banknote-navy hover:bg-slate-200 transition-colors font-black">-</button>
                          <span className="px-3 py-1.5 font-bold text-slate-900 text-sm border-x border-slate-200 min-w-[2.5rem] text-center">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="px-3 py-1.5 text-slate-500 hover:text-banknote-navy hover:bg-slate-200 transition-colors font-black">+</button>
                        </div>
                      </div>

                      {/* Desktop subtotal cell */}
                      <div className="hidden md:block md:col-span-2 text-right font-black text-banknote-green">
                        ${(discountedPrice * item.quantity).toFixed(2)}
                      </div>

                      {/* Mobile subtotal */}
                      <div className="md:hidden flex justify-between items-center mt-4 pt-4 border-t border-slate-100">
                        <span className="font-bold text-sm text-slate-500 uppercase">Subtotal:</span>
                        <span className="font-black text-banknote-green">${(discountedPrice * item.quantity).toFixed(2)}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>


          <div className="w-full lg:w-[400px]">
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 md:p-8 sticky top-28">
              <h2 className="text-xl font-black text-banknote-navy border-b border-slate-200 pb-4 mb-6 uppercase tracking-wide">Cart Totals</h2>
              
              <div className="flex justify-between items-center mb-4">
                <span className="text-slate-600 font-medium">Subtotal</span>
                <span className="font-bold text-slate-900">${cartTotal.toFixed(2)}</span>
              </div>
              
              <div className="flex flex-col gap-2 border-b border-slate-200 pb-6 mb-6">
                 <div className="flex justify-between items-center text-sm">
                   <span className="text-slate-600 font-medium">Shipping</span>
                   <span className="text-slate-900">Calculated at checkout</span>
                 </div>
              </div>
              
              <div className="flex justify-between items-center mb-8">
                <span className="text-lg font-bold text-banknote-navy">Total</span>
                <span className="font-black text-2xl text-banknote-green">${cartTotal.toFixed(2)}</span>
              </div>

              <Link href="/checkout" className="flex items-center justify-center bg-banknote-navy hover:bg-banknote-green text-white font-bold py-4 px-8 rounded-md transition-colors text-lg shadow-lg uppercase tracking-wider w-full group">
                Proceed to Checkout
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
