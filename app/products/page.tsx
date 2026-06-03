import Link from 'next/link';
import Image from 'next/image';
import { ShoppingCart } from 'lucide-react';
import { generateProductSchema } from '@/lib/schema';
import { products, categories } from '@/lib/data';

export const metadata = {
  title: 'Shop Premium Prop Currency',
  description: 'Browse our complete catalog of Australian, US, British, and Euro prop money designed for commercial production, film, photography, and training.',
};

export default function ProductsPage() {
  return (
    <div className="bg-brand-gray pb-24 min-h-screen">
      {/* Search Schemas */}
      {products.map(p => (
        <script
          key={p.id}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(generateProductSchema({
              name: p.name,
              description: p.description,
              image: p.image,
              price: p.price,
              url: `https://australianpropmoney.com.au/products/${p.slug}`
            })),
          }}
        />
      ))}

      {/* Header */}
      <div className="bg-banknote-navy text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tight">Production-Ready Prop Currency</h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto font-medium">
            From single close-up stacks to volume pallet loads. Engineered for the lens.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Sidebar Filters */}
        <aside className="hidden md:block col-span-1 space-y-8">
          <div>
            <h3 className="font-bold text-banknote-navy mb-4 border-b border-gray-200 pb-2 uppercase tracking-wide">Categories</h3>
            <ul className="space-y-3">
              <li><Link href="/products" className="text-banknote-green font-bold">All Products</Link></li>
              {categories.map(c => (
                <li key={c.id}><Link href={`/category/${c.slug}`} className="text-slate-600 hover:text-banknote-green transition-colors font-medium">{c.name}</Link></li>
              ))}
            </ul>
          </div>
        </aside>

        {/* Product Grid */}
        <div className="col-span-1 md:col-span-3">
          <div className="flex justify-between items-center mb-6">
            <p className="text-slate-600 font-medium">Showing {products.length} products</p>
            <select className="border border-slate-300 rounded-md py-2 px-3 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-banknote-green focus:border-transparent cursor-pointer bg-white">
              <option>Sort by Featured</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Newest Arrivals</option>
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <div key={product.id} className="bg-white border border-slate-200 rounded-xl overflow-hidden hover:shadow-2xl transition-all group flex flex-col">
                <Link href={`/products/${product.slug}`} className="relative h-56 bg-slate-100 overflow-hidden block">
                  <div className="absolute inset-0 bg-transparent group-hover:bg-banknote-navy/10 transition-colors z-10" />
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                </Link>
                <div className="p-6 flex flex-col flex-1">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">{product.categoryName}</span>
                  <Link href={`/products/${product.slug}`} className="font-bold text-banknote-navy hover:text-banknote-green leading-snug mb-4 flex-1 text-lg">
                    {product.name}
                  </Link>
                  <div className="flex items-center justify-between mt-auto">
                    <span className="font-black text-2xl text-slate-900">${product.price}</span>
                    <button className="bg-slate-100 hover:bg-banknote-green hover:text-white p-3 rounded-full text-banknote-navy transition-colors shrink-0 shadow-sm" aria-label="Add to cart">
                      <ShoppingCart className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
