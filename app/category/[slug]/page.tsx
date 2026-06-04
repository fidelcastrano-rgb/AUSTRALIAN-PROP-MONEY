import Link from 'next/link';
import Image from 'next/image';
import { generateProductSchema } from '@/lib/schema';
import { products, categories } from '@/lib/data';
import { notFound } from 'next/navigation';
import AddToCartButton from '@/components/shared/AddToCartButton';

export async function generateStaticParams() {
  return categories.map((category) => ({
    slug: category.slug,
  }));
}

export async function generateMetadata(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const category = categories.find(c => c.slug === params.slug);
  
  if (!category) {
    return {
      title: 'Category Not Found',
    };
  }

  return {
    title: `${category.name} | Australian Prop Money`,
    description: category.description,
  };
}

export default async function CategoryPage(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const category = categories.find(c => c.slug === params.slug);
  
  if (!category) {
    notFound();
  }

  const categoryProducts = products.filter(p => p.category === category.slug);

  return (
    <div className="bg-brand-gray pb-24 min-h-screen">
      {/* Search Schemas */}
      {categoryProducts.map(p => (
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
          <h1 className="text-4xl md:text-5xl font-black mb-4">{category.name} Prop Notes</h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto font-medium">
            {category.description}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Sidebar Filters */}
        <aside className="hidden md:block col-span-1 space-y-8">
          <div>
            <h3 className="font-bold text-banknote-navy mb-4 border-b border-gray-200 pb-2 uppercase tracking-wide">Categories</h3>
            <ul className="space-y-3">
              <li><Link href="/products" className="text-gray-600 hover:text-banknote-green transition-colors font-medium">All Products</Link></li>
              {categories.map((c) => (
                <li key={c.id}>
                  <Link 
                    href={`/category/${c.slug}`} 
                    className={`font-medium transition-colors ${category.slug === c.slug ? 'text-banknote-green' : 'text-gray-600 hover:text-banknote-green'}`}
                  >
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        {/* Product Grid */}
        <div className="col-span-1 md:col-span-3">
          <div className="flex justify-between items-center mb-6">
            <p className="text-gray-600 font-medium">Showing {categoryProducts.length} products</p>
            <select className="border border-slate-300 rounded-md py-2 px-3 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-banknote-green focus:border-transparent cursor-pointer bg-white">
              <option>Sort by Featured</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Newest Arrivals</option>
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categoryProducts.map((product) => (
              <div key={product.id} className="bg-white border border-slate-200 rounded-xl overflow-hidden hover:shadow-xl transition-all group flex flex-col">
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
                    <AddToCartButton product={{ id: product.id, name: product.name, price: product.price, image: product.image }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {category.slug === 'euro' && (
          <div className="col-span-1 md:col-span-4 mt-16 bg-white border border-slate-200 rounded-2xl p-8 lg:p-12 prose prose-slate max-w-none">
            <h2 className="text-3xl font-black text-banknote-navy mb-6">Why Our Euro Props Are Undetectable on Camera</h2>
            <p className="text-lg text-slate-700 mb-8">
              We define undetectable by visual standards—meaning our props appear completely authentic when filmed with professional cameras under studio lighting. When you purchase our Euro props, you&apos;re receiving a premium product engineered with three layers of realism specifically for film, television, and photography production:
            </p>

            <h3 className="text-2xl font-bold text-banknote-navy mt-10 mb-4">Three Layers of Photorealistic Detail</h3>
            
            <h4 className="text-xl font-bold text-banknote-navy mt-6 mb-2">1. The Paper</h4>
            <p className="text-slate-700 mb-6">
              We do not use standard printer paper or cheap novelty stock. Our paper is specially sourced to match the exact thickness, fiber composition, and tactile feel of the Euro Series 2 (Europa Series) banknotes. The cotton-linen blend creates the same crisp rustle and flexibility that professional cinematographers expect when handling cash on set.
            </p>

            <h4 className="text-xl font-bold text-banknote-navy mt-6 mb-2">2. The Hologram</h4>
            <p className="text-slate-700 mb-6">
              Each note features a reflective holographic strip that dynamically reacts to light sources. This is essential for high-definition video production, where camera sensors capture every reflective detail. The hologram shifts colors realistically under different lighting conditions, eliminating the flat, dead appearance that gives away cheap props on screen.
            </p>

            <h4 className="text-xl font-bold text-banknote-navy mt-6 mb-2">3. The Print</h4>
            <p className="text-slate-700 mb-6">
              We use high-resolution offset printing technology to replicate the intricate micro-text, fine-line patterns, and architectural details found on authentic €10, €20, €50, and €100 notes. Our printing process captures the subtle color gradients and security features visible to the naked eye and camera lenses alike.
            </p>

            <h3 className="text-2xl font-bold text-banknote-navy mt-10 mb-4">Available Euro Denominations</h3>
            <p className="text-slate-700 mb-4">We stock the full range of Euro props to suit any script, budget, or collection requirement:</p>
            
            <ul className="space-y-4 mb-8">
              <li className="flex flex-col">
                <span className="font-bold text-banknote-navy">€10 and €20 Notes</span>
                <span className="text-slate-700">Perfect for cash register scenes, street vendor transactions, pocket change reveals, and everyday European setting authenticity.</span>
              </li>
              <li className="flex flex-col">
                <span className="font-bold text-banknote-navy">€50 and €100 Stacks</span>
                <span className="text-slate-700">The most requested items for high-stakes movie scenes, heist sequences, music videos, luxury lifestyle shots, and crime drama montages.</span>
              </li>
              <li className="flex flex-col">
                <span className="font-bold text-banknote-navy">€200 and €500 Notes</span>
                <span className="text-slate-700">Rare, high-value props for exclusive production needs, villain vault scenes, international crime syndicate portrayals, and maximum-impact visual moments.</span>
              </li>
            </ul>

            <h3 className="text-2xl font-bold text-banknote-navy mt-10 mb-4">Legal Usage & Safety Guidelines</h3>
            
            <h4 className="text-xl font-bold text-banknote-navy mt-6 mb-2">Are These Counterfeit Euro Bills for Sale Legal to Own?</h4>
            <p className="text-slate-700 mb-4">Yes. These items are strictly classified as motion picture props and novelty collectibles. They are completely legal to own for:</p>
            <ul className="list-disc pl-6 mb-8 text-slate-700 space-y-2">
              <li>Artistic purposes (film, television, theater productions)</li>
              <li>Educational purposes (bank security training, law enforcement simulations)</li>
              <li>Entertainment purposes (collectibles, photography, content creation)</li>
              <li>Professional use (music videos, commercial advertising, social media content)</li>
            </ul>

            <h4 className="text-xl font-bold text-banknote-navy mt-6 mb-2">Important Legal Disclaimer</h4>
            <p className="text-slate-700 mb-4">While our props are visually realistic fake money, they are NOT legal tender under any circumstances:</p>
            <ul className="list-disc pl-6 mb-8 text-slate-700 space-y-2">
              <li>They are designed to fail all automated banking checks (ATM machines, cash validators, currency detectors)</li>
              <li>They must never be used for purchases or attempted as real currency</li>
              <li>They cannot be deposited into bank accounts</li>
              <li>Using them fraudulently is illegal and carries severe criminal penalties</li>
              <li>Each note includes clear PROPRIETARY PROP markings on the reverse side visible upon close inspection</li>
            </ul>

            <h3 className="text-2xl font-bold text-banknote-navy mt-10 mb-4">Frequently Asked Questions</h3>

            <h4 className="text-xl font-bold text-banknote-navy mt-6 mb-2">Can I Buy Real Counterfeit Money Online That Works in Vending Machines?</h4>
            <p className="text-slate-700 mb-4">No—and you shouldn&apos;t try. Our notes are for visual use only. They do not contain:</p>
            <ul className="list-disc pl-6 mb-4 text-slate-700 space-y-2">
              <li>Magnetic ink required by currency validators</li>
              <li>Conductive properties needed for machine detection</li>
              <li>Security threads that pass electronic verification</li>
              <li>Watermarks visible under specialized lighting</li>
            </ul>
            <p className="text-slate-700 mb-8">Attempting to use any fake currency in vending machines, ATMs, or stores is a federal crime with serious prison consequences. Our props exist solely for camera authenticity, not financial deception.</p>

            <h4 className="text-xl font-bold text-banknote-navy mt-6 mb-2">Do You Ship to the UK?</h4>
            <p className="text-slate-700 mb-4">Yes. We ship our Euro props globally, including to:</p>
            <ul className="list-disc pl-6 mb-4 text-slate-700 space-y-2">
              <li>United Kingdom (UK)</li>
              <li>United States (USA)</li>
              <li>European Union countries</li>
              <li>Canada, Australia, New Zealand</li>
              <li>Africa (including Cameroon/Douala region)</li>
              <li>Asia, South America, and the Middle East</li>
            </ul>
            <p className="text-slate-700 mb-8">Many international clients pair our Euro props with our fake UK pound notes and Swiss Franc Prop Banknotes for international travel scenes, airport sequences, money exchange scenes, and training simulations.</p>

            <h4 className="text-xl font-bold text-banknote-navy mt-6 mb-2">How Long Does Shipping Take?</h4>
            <ul className="list-disc pl-6 mb-8 text-slate-700 space-y-2">
              <li>Standard shipping: 7–14 business days globally</li>
              <li>Express shipping: 3–5 business days to UK/USA/EU</li>
              <li>Rush production: Available for urgent film deadlines (contact us)</li>
            </ul>

            <h4 className="text-xl font-bold text-banknote-navy mt-6 mb-2">Can I Customize Denominations or Create Custom Stacks?</h4>
            <p className="text-slate-700 mb-4">Yes! We offer custom bundle options:</p>
            <ul className="list-disc pl-6 mb-8 text-slate-700 space-y-2">
              <li>Pre-wrapped cash stacks with banding</li>
              <li>Fanned-out cash displays for dramatic reveals</li>
              <li>Mixed denomination bundles for specific script requirements</li>
              <li>Branded prop money bags or briefcases</li>
            </ul>

            <h3 className="text-2xl font-bold text-banknote-navy mt-10 mb-4">Why Professional Productions Choose Our Euro Props</h3>
            <ul className="list-disc pl-6 mb-10 text-slate-700 space-y-2">
              <li>Camera-tested under 4K and 8K resolution</li>
              <li>Lighting-tested under studio LED, HMI, and natural light</li>
              <li>Industry-approved by prop masters and cinematographers</li>
              <li>Legally compliant with motion picture prop regulations</li>
              <li>Fast turnaround for tight production schedules</li>
              <li>Bulk discounts available for large productions</li>
            </ul>
            
            <div className="bg-slate-50 p-6 rounded-lg border border-slate-200 text-sm text-slate-600">
              <strong className="text-banknote-navy mb-2 block">Prop Money Usage Disclaimer:</strong>
              This website and all products are intended solely for legitimate motion picture, television, educational, and novelty purposes. All purchasers agree to use these props in compliance with applicable laws and regulations.
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
