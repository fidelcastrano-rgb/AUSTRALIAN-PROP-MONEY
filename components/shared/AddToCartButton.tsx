'use client';

import { ShoppingCart } from 'lucide-react';
import { useCart } from './CartProvider';
import { useState } from 'react';

export default function AddToCartButton({ 
  product, 
  variant = 'icon',
  quantity = 1
}: { 
  product: { id: string, name: string, price: number | string, image: string };
  variant?: 'icon' | 'full';
  quantity?: number;
}) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart({ ...product, quantity });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  if (variant === 'full') {
    return (
      <button 
        onClick={handleAdd}
        className={`flex-1 ${added ? 'bg-banknote-navy' : 'bg-banknote-green hover:bg-banknote-green-dark'} text-white rounded font-bold text-lg flex items-center justify-center gap-2 transition-colors shadow-md uppercase tracking-wide px-4 py-3`}
      >
        <ShoppingCart className="w-5 h-5" />
        {added ? 'Added to Cart' : 'Add to Cart'}
      </button>
    );
  }

  return (
    <button 
      onClick={handleAdd}
      className={`${added ? 'bg-banknote-navy text-white' : 'bg-slate-100 hover:bg-banknote-green hover:text-white text-banknote-navy'} p-3 rounded-full transition-colors shrink-0 shadow-sm`} 
      aria-label="Add to cart"
    >
      <ShoppingCart className="w-5 h-5" />
    </button>
  );
}
