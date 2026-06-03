'use client';

import { useState } from 'react';
import { ShoppingCart } from 'lucide-react';
import { useCart } from './CartProvider';

export default function ProductDetailAddToCart({ 
  product 
}: { 
  product: { id: string, name: string, price: number | string, image: string }
}) {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const decrease = () => setQuantity(prev => Math.max(1, prev - 1));
  const increase = () => setQuantity(prev => prev + 1);

  const handleAdd = () => {
    addToCart({ ...product, quantity });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="flex gap-4">
      <div className="flex items-center border border-slate-300 rounded bg-slate-50">
        <button onClick={decrease} className="px-4 py-3 text-slate-500 hover:text-banknote-navy transition-colors font-black">-</button>
        <span className="px-4 py-3 font-bold text-slate-900 border-x border-slate-200 min-w-[3rem] text-center">{quantity}</span>
        <button onClick={increase} className="px-4 py-3 text-slate-500 hover:text-banknote-navy transition-colors font-black">+</button>
      </div>
      <button 
        onClick={handleAdd}
        className={`flex-1 ${added ? 'bg-banknote-navy' : 'bg-banknote-green hover:bg-banknote-green-dark'} text-white rounded font-bold text-lg flex items-center justify-center gap-2 transition-colors shadow-md uppercase tracking-wide px-4 py-3`}
      >
        <ShoppingCart className="w-5 h-5" />
        {added ? 'Added to Cart' : 'Add to Cart'}
      </button>
    </div>
  );
}
