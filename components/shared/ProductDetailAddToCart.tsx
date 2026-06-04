'use client';

import { useState } from 'react';
import { ShoppingCart, CheckCircle2 } from 'lucide-react';
import { useCart } from './CartProvider';
import { getDiscountedUnitPrice, getDiscountPercentage } from '@/lib/utils';

interface ProductVariation {
  id: string;
  name: string;
  price: string;
}

export default function ProductDetailAddToCart({ 
  product 
}: { 
  product: { 
    id: string; 
    name: string; 
    price: number | string; 
    image: string; 
    slug: string;
    variations?: ProductVariation[];
  }
}) {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const [selectedVariation, setSelectedVariation] = useState<ProductVariation | null>(() => {
    return product.variations && product.variations.length > 0 
      ? product.variations[0] 
      : null;
  });

  const decrease = () => setQuantity(prev => Math.max(1, prev - 1));
  const increase = () => setQuantity(prev => prev + 1);

  const basePrice = selectedVariation ? Number(selectedVariation.price) : Number(product.price);

  const handleAdd = () => {
    if (selectedVariation) {
      addToCart({ 
        id: `${product.id}__${selectedVariation.id}`,
        productId: product.id,
        name: product.name,
        variationName: selectedVariation.name,
        price: basePrice, 
        image: product.image,
        quantity,
        slug: product.slug
      });
    } else {
      addToCart({ 
        id: product.id,
        productId: product.id,
        name: product.name,
        price: basePrice, 
        image: product.image,
        quantity,
        slug: product.slug
      });
    }
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const activeDiscount = getDiscountPercentage(quantity);
  const activeUnitPrice = getDiscountedUnitPrice(basePrice, quantity);
  const totalPrice = activeUnitPrice * quantity;

  // Static tiers for preview
  const pricingTiers = [
    { qty: '1 - 2', name: 'Standard', discount: 0 },
    { qty: '3 - 4', name: 'Bronze Bulk', discount: 10 },
    { qty: '5 - 9', name: 'Silver Bulk', discount: 20 },
    { qty: '10 - 19', name: 'Gold Bulk', discount: 30 },
    { qty: '20 - 49', name: 'Diamond Bulk', discount: 40 },
    { qty: '50+', name: 'Wholesale Special', discount: 50 },
  ];

  return (
    <div className="space-y-6">
      {/* Variation Selector */}
      {product.variations && product.variations.length > 0 && (
        <div className="space-y-3">
          <label className="block text-xs font-extrabold text-banknote-navy uppercase tracking-widest">
            Choose Package Size (Face Value Option)
          </label>
          <div className="grid grid-cols-1 gap-2">
            {product.variations.map((v) => {
              const isSelected = selectedVariation?.id === v.id;
              return (
                <button
                  key={v.id}
                  type="button"
                  onClick={() => setSelectedVariation(v)}
                  className={`flex justify-between items-center px-4 py-3 border rounded-xl font-bold transition-all text-left ${
                    isSelected
                      ? 'border-banknote-green bg-emerald-50/40 text-banknote-navy ring-2 ring-banknote-green/25'
                      : 'border-slate-200 bg-white hover:border-slate-300 text-slate-700'
                  }`}
                >
                  <span className="text-sm tracking-tight">{v.name}</span>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Price:</span>
                    <span className={`text-sm font-black ${isSelected ? 'text-banknote-green' : 'text-slate-900'}`}>
                      ${Number(v.price).toFixed(2)}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Dynamic Price Display depending on Quantity */}
      <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
        <div className="flex justify-between items-baseline">
          <span className="text-sm font-semibold text-slate-500">Live Item Price:</span>
          <div className="flex items-baseline gap-2">
            {activeDiscount > 0 && (
              <span className="text-sm font-bold text-red-500 bg-red-50 border border-red-200 px-2 py-0.5 rounded">
                -{activeDiscount}% Off Bulk Rate
              </span>
            )}
            <span className="text-2xl font-black text-slate-900">${activeUnitPrice.toFixed(2)}</span>
            {activeDiscount > 0 && (
              <span className="text-xs text-slate-400 line-through">${basePrice.toFixed(2)}</span>
            )}
            <span className="text-xs font-semibold text-slate-500">/ package</span>
          </div>
        </div>
        <div className="h-[1px] bg-slate-200 my-2"></div>
        <div className="flex justify-between items-center">
          <span className="text-sm font-bold text-slate-700">Estimated Subtotal:</span>
          <span className="text-xl font-black text-banknote-green">${totalPrice.toFixed(2)}</span>
        </div>
      </div>

      <div className="flex gap-4">
        <div className="flex items-center border border-slate-300 rounded bg-slate-50">
          <button onClick={decrease} className="px-4 py-3 text-slate-500 hover:text-banknote-navy transition-colors font-black" aria-label="Decrease quantity">-</button>
          <span className="px-4 py-3 font-bold text-slate-900 border-x border-slate-200 min-w-[3rem] text-center">{quantity}</span>
          <button onClick={increase} className="px-4 py-3 text-slate-500 hover:text-banknote-navy transition-colors font-black" aria-label="Increase quantity">+</button>
        </div>
        <button 
          onClick={handleAdd}
          className={`flex-1 ${added ? 'bg-banknote-navy' : 'bg-banknote-green hover:bg-banknote-green-dark'} text-white rounded font-bold text-lg flex items-center justify-center gap-2 transition-colors shadow-md uppercase tracking-wide px-4 py-3`}
        >
          <ShoppingCart className="w-5 h-5" />
          {added ? 'Added to Cart' : 'Add to Cart'}
        </button>
      </div>

      {/* Bulk Pricing Grid Display */}
      <div className="border border-slate-200 rounded-xl overflow-hidden shadow-sm bg-white">
        <div className="bg-slate-50 px-4 py-3 border-b border-slate-200">
          <h4 className="text-xs font-bold text-banknote-navy uppercase tracking-wider">Volume Discount Pricing Tiers</h4>
          <p className="text-[11px] text-slate-500">Add multiple Stacks to your order for steep discounts</p>
        </div>
        <div className="grid grid-cols-3 text-xs border-b border-slate-100 bg-slate-100/50 p-2 font-bold text-slate-600">
          <div>Quantity Stacks</div>
          <div className="text-center">Discount</div>
          <div className="text-right">Price Per Stack</div>
        </div>
        <div className="divide-y divide-slate-100 text-xs">
          {pricingTiers.map((tier) => {
            const isCurrent = 
              (tier.discount === 0 && quantity <= 2) ||
              (tier.discount === 10 && (quantity === 3 || quantity === 4)) ||
              (tier.discount === 20 && quantity >= 5 && quantity <= 9) ||
              (tier.discount === 30 && quantity >= 10 && quantity <= 19) ||
              (tier.discount === 40 && quantity >= 20 && quantity <= 49) ||
              (tier.discount === 50 && quantity >= 50);

            const tierPrice = basePrice * (1 - tier.discount / 100);

            return (
              <div 
                key={tier.qty} 
                className={`grid grid-cols-3 p-2.5 items-center transition-colors ${
                  isCurrent ? 'bg-emerald-50 text-emerald-900 border-l-2 border-emerald-500 font-bold' : 'text-slate-700'
                }`}
              >
                <div className="flex items-center gap-1">
                  {tier.qty}
                  {isCurrent && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />}
                </div>
                <div className="text-center font-semibold text-red-500">
                  {tier.discount === 0 ? 'Regular' : `-${tier.discount}%`}
                </div>
                <div className="text-right font-bold text-slate-900">
                  ${tierPrice.toFixed(2)}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
