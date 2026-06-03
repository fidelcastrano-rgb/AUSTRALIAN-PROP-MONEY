import { ShoppingCart, ShieldCheck, Truck, ChevronRight, Check } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { products, getProductBySlug } from '@/lib/data';
import { generateProductSchema } from '@/lib/schema';

export async function generateStaticParams() {
  return products.map((product) => ({
    slug: product.slug,
  }));
}

export async function generateMetadata(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const product = getProductBySlug(params.slug);
  
  if (!product) {
    return {
      title: 'Product Not Found',
    };
  }

  return {
    title: `${product.name} | Australian Prop Money`,
    description: product.description,
  };
}

export default async function ProductDetailPage(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const product = getProductBySlug(params.slug);

  if (!product) {
    notFound();
  }

  const relatedProducts = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);

  return (
    <div className="bg-brand-gray pb-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateProductSchema({
            name: product.name,
            description: product.description,
            image: product.image,
            price: product.price,
            url: `https://australianpropmoney.com.au/products/${product.slug}`
          })),
        }}
      />
      {/* Breadcrumbs */}
      <div className="bg-white border-b border-slate-200 py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center text-[11px] font-bold uppercase tracking-widest text-slate-500">
          <Link href="/" className="hover:text-banknote-green transition-colors">Home</Link>
          <ChevronRight className="w-3 h-3 mx-2" />
          <Link href="/products" className="hover:text-banknote-green transition-colors">Products</Link>
          <ChevronRight className="w-3 h-3 mx-2" />
          <Link href={`/category/${product.category}`} className="hover:text-banknote-green transition-colors">{product.categoryName}</Link>
          <ChevronRight className="w-3 h-3 mx-2" />
          <span className="text-banknote-navy truncate">{product.name}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            
            {/* Product Image Gallery */}
            <div className="p-8 lg:border-r border-slate-100 flex flex-col">
              <div className="relative aspect-square bg-slate-100 rounded-xl overflow-hidden mb-4 border border-slate-200">
                <Image 
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="grid grid-cols-4 gap-4 mt-auto">
                {[1, 2, 3, 4].map((i) => (
                   <button key={i} className={`relative aspect-square rounded-lg overflow-hidden border-2 bg-slate-100 ${i === 1 ? 'border-banknote-green' : 'border-transparent'} hover:border-banknote-green/50 transition-colors`}>
                    <Image 
                      src={product.image} 
                      alt="Thumbnail"
                      fill
                      className="object-cover opacity-80 hover:opacity-100"
                      referrerPolicy="no-referrer"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div className="p-8 lg:p-12 flex flex-col">
              <div className="mb-4">
                <span className="inline-block px-3 py-1 bg-banknote-gold/10 text-banknote-navy rounded text-[10px] font-bold uppercase tracking-widest">{product.categoryName}</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-black text-banknote-navy mb-4 leading-tight tracking-tight">
                {product.name}
              </h1>
              
              <div className="text-4xl font-black text-banknote-green mb-6 flex items-end gap-2">
                ${product.price} <span className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-1">AUD</span>
              </div>

              <div className="prose prose-sm text-slate-600 mb-8 font-medium">
                <p>{product.description}</p>
              </div>
              
              <h3 className="font-bold text-banknote-navy mb-3 uppercase tracking-wide text-sm">Key Features</h3>
              <ul className="space-y-2 mb-8">
                {product.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start text-slate-600 font-medium text-sm">
                    <Check className="w-5 h-5 text-banknote-green mr-2 shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="space-y-4 mb-8">
                <div className="flex items-center text-sm text-slate-700 font-medium">
                  <ShieldCheck className="w-5 h-5 text-banknote-gold mr-3" />
                  <span>100% Legal Commercial Compliance</span>
                </div>
                <div className="flex items-center text-sm text-slate-700 font-medium">
                  <Truck className="w-5 h-5 text-banknote-navy mr-3" />
                  <span>Express Dispatch Available Worldwide</span>
                </div>
              </div>

              <div className="mt-auto border-t border-slate-200 pt-8">
                <div className="flex gap-4">
                  <div className="flex items-center border border-slate-300 rounded bg-slate-50">
                    <button className="px-4 py-3 text-slate-500 hover:text-banknote-navy transition-colors font-black">-</button>
                    <span className="px-4 py-3 font-bold text-slate-900 border-x border-slate-200">1</span>
                    <button className="px-4 py-3 text-slate-500 hover:text-banknote-navy transition-colors font-black">+</button>
                  </div>
                  <button className="flex-1 bg-banknote-green text-white rounded font-bold text-lg flex items-center justify-center gap-2 hover:bg-banknote-green-dark transition-colors shadow-md uppercase tracking-wide">
                    <ShoppingCart className="w-5 h-5" />
                    Add to Cart
                  </button>
                </div>
              </div>
              
              {/* Compliance Warning on Product Level */}
              <div className="mt-6 bg-red-50 border border-red-200 p-4 rounded flex items-start gap-3">
                <ShieldCheck className="w-6 h-6 text-red-600 shrink-0" />
                <p className="text-[11px] text-red-800 font-bold uppercase tracking-wider leading-relaxed">
                  DISCLAIMER: This product is intended solely for film, television, theatrical, educational, training and display purposes. It is not legal tender and must not be used as real currency. Misuse is a federal offense.
                </p>
              </div>

            </div>
          </div>
        </div>
      </div>
      
      {/* Product Details Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 lg:p-12">
          <h2 className="text-2xl font-black text-banknote-navy mb-6 pb-4 border-b border-slate-200 uppercase tracking-wide">Product Specifications</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm">
            <div>
              <h3 className="font-bold text-lg mb-4 text-banknote-navy">Technical Details</h3>
              <ul className="list-disc pl-5 space-y-2 text-slate-600 font-medium">
                {product.specifications.map((spec, idx) => (
                  <li key={idx}>{spec}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4 text-banknote-navy">Shipping & Returns</h3>
               <ul className="list-disc pl-5 space-y-2 text-slate-600 font-medium">
                <li>Overnight Express available to major Australian cities</li>
                <li>International shipping via DHL Express</li>
                <li>Discreet, secure packaging</li>
                <li>Returns accepted within 14 days (must be unused/unopened)</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      
      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
          <h2 className="text-2xl font-black text-banknote-navy mb-8 uppercase tracking-wide">Related in {product.categoryName}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((p) => (
              <Link key={p.id} href={`/products/${p.slug}`} className="bg-white border border-slate-200 rounded-xl overflow-hidden hover:shadow-xl transition-all group flex flex-col">
                <div className="relative h-48 bg-slate-100 overflow-hidden block">
                  <div className="absolute inset-0 bg-transparent group-hover:bg-banknote-navy/10 transition-colors z-10" />
                  <Image
                    src={p.image}
                    alt={p.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <span className="font-bold text-banknote-navy group-hover:text-banknote-green leading-snug mb-3 flex-1 text-sm">
                    {p.name}
                  </span>
                  <div className="flex items-center justify-between mt-auto">
                    <span className="font-black text-lg text-slate-900">${p.price}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
