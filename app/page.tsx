import Image from "next/image";
import Link from "next/link";
import { CheckCircle, ShieldCheck, Truck, Film, Camera, Clapperboard, Award, HeartHandshake } from "lucide-react";
import { organizationSchema, websiteSchema } from "@/lib/schema";
import { categories } from "@/lib/data";

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([organizationSchema, websiteSchema]),
        }}
      />
      
      {/* HERO SECTION */}
      <section className="grid grid-cols-1 lg:grid-cols-12 min-h-[600px] border-b border-slate-200 bg-white">
        
        <div className="col-span-1 lg:col-span-7 flex flex-col justify-center px-6 sm:px-12 lg:p-16 xl:p-24 bg-gradient-to-br from-white to-slate-50 order-2 lg:order-1 relative z-10">
          <div className="mb-6 inline-flex self-start items-center bg-banknote-gold/10 text-[#856404] px-4 py-2 rounded text-xs font-bold uppercase tracking-tighter italic">
            Official Film & TV Production Supplier
          </div>
          
          <h1 className="text-4xl sm:text-5xl lg:text-[58px] font-black text-banknote-navy leading-[1.1] mb-6">
            Australian Prop Money for <span className="text-banknote-green">Film, TV & Creative</span> Productions
          </h1>
          
          <p className="text-lg text-slate-600 mb-10 leading-relaxed max-w-xl">
            Premium Australian-style prop notes designed exclusively for film production, photography, theatre, training simulations and creative projects.
          </p>
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <Link href="/products" className="bg-banknote-green text-white px-10 py-5 rounded-lg font-black text-lg shadow-xl shadow-banknote-green/20 hover:scale-[1.02] transition-transform text-center w-full sm:w-auto uppercase">
              Shop Now
            </Link>
            <Link href="/contact" className="hidden sm:flex border-2 border-slate-200 text-slate-600 px-8 py-4 rounded-lg font-bold hover:border-banknote-navy hover:text-banknote-navy transition-colors items-center justify-center">
              Request Quote
            </Link>
          </div>
          
          <div className="mt-12 flex flex-col sm:flex-row items-start sm:items-center gap-6 text-xs font-bold uppercase tracking-widest text-slate-500">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-banknote-green" />
              <span>Industry Standard Quality</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-banknote-gold" />
              <span>100% Legal For Production</span>
            </div>
          </div>
        </div>

        <div className="col-span-1 lg:col-span-5 relative bg-banknote-navy overflow-hidden order-1 lg:order-2 min-h-[400px]">
          <div className="absolute inset-0 opacity-40 bg-[url('https://superpropnotes.com/wp-content/uploads/2023/06/cd7072b9df060e9841a84c6ced00be46.jpg')] bg-cover bg-center"></div>
          <div className="absolute inset-0 bg-gradient-to-l from-transparent via-banknote-navy/40 to-banknote-navy hidden lg:block"></div>
          
          <div className="absolute bottom-8 right-6 left-6 lg:bottom-10 lg:right-10 lg:left-10 p-6 bg-white/10 backdrop-blur-md rounded-xl border border-white/20">
            <div className="flex gap-3 mb-4">
              <div className="w-10 h-6 bg-banknote-green rounded shadow-sm opacity-80"></div>
              <div className="w-10 h-6 bg-banknote-gold rounded shadow-sm opacity-80"></div>
              <div className="w-10 h-6 bg-banknote-pink rounded shadow-sm opacity-80"></div>
            </div>
            <p className="text-white font-medium text-sm italic leading-relaxed">
              &quot;The most realistic prop notes we&apos;ve used for our Sydney-based crime drama series. Absolutely flawless for close-up shots.&quot;
            </p>
            <p className="text-white/60 text-xs font-bold mt-4 uppercase tracking-widest">— Lead Prop Master</p>
          </div>
        </div>
      </section>

      {/* TRUST SIGNALS */}
      <section className="h-auto md:h-12 py-4 md:py-0 bg-slate-50 border-b border-slate-200 flex items-center justify-around flex-wrap gap-4 px-4 text-[11px] font-bold uppercase tracking-widest text-slate-500">
        <span className="flex items-center gap-2"><span className="w-2 h-2 bg-banknote-gold rounded-full"></span> Australian Owned</span>
        <span className="flex items-center gap-2"><span className="w-2 h-2 bg-banknote-green rounded-full"></span> Fast Dispatch</span>
        <span className="flex items-center gap-2"><span className="w-2 h-2 bg-banknote-navy rounded-full"></span> Production Ready</span>
        <span className="flex items-center gap-2"><span className="w-2 h-2 bg-banknote-pink rounded-full"></span> Secured Checkout</span>
      </section>

      {/* FEATURED CATEGORIES */}
      <section className="py-24 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-banknote-navy mb-4 tracking-tight">Shop by Production Needs</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto font-medium">
              Select the perfect prop money configuration for your specific creative or educational requirements.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((c) => (
              <Link key={c.id} href={`/category/${c.slug}`} className="group flex flex-col rounded-xl overflow-hidden border border-slate-200 bg-white shadow-sm hover:shadow-2xl transition-all duration-300">
                <div className="relative h-48 bg-slate-100 overflow-hidden">
                  <div className="absolute inset-0 bg-transparent group-hover:bg-banknote-navy/10 transition-colors z-10" />
                  <Image 
                    src={c.image} 
                    alt={c.name} 
                    fill 
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="p-6 text-center">
                  <h3 className="font-black text-lg text-banknote-navy group-hover:text-banknote-green transition-colors uppercase tracking-wide">{c.name}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="py-24 bg-gradient-to-b from-slate-50 to-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="w-full lg:w-1/2">
              <div className="relative h-[600px] rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
                <Image 
                  src="https://superpropnotes.com/wp-content/uploads/2023/06/cd7072b9df060e9841a84c6ced00be46.jpg" 
                  alt="Quality Prop Money Printing"
                  fill
                  className="object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
            
            <div className="w-full lg:w-1/2 space-y-10">
              <div>
                <h2 className="text-3xl md:text-5xl font-black text-banknote-navy mb-6 tracking-tight leading-tight">The Standard for<br/>Australian productions</h2>
                <p className="text-lg text-slate-600 font-medium">
                  We supply top-tier production companies across Sydney, Melbourne, and the Gold Coast with the industry standard in prop currency.
                </p>
              </div>

              <div className="space-y-8">
                <article className="flex gap-6 items-start">
                  <div className="shrink-0 w-12 h-12 bg-banknote-green text-white rounded-lg flex items-center justify-center font-black text-xl shadow-md">1</div>
                  <div>
                    <h3 className="text-xl font-bold text-banknote-navy mb-2 uppercase tracking-wide">Immaculate Detail & Quality</h3>
                    <p className="text-slate-600">Our notes are printed on high-grade paper using offset lithography, mimicking the structural feel and visual fidelity required for 8K cinematic cameras.</p>
                  </div>
                </article>
                <article className="flex gap-6 items-start">
                  <div className="shrink-0 w-12 h-12 bg-banknote-gold text-white rounded-lg flex items-center justify-center font-black text-xl shadow-md">2</div>
                  <div>
                    <h3 className="text-xl font-bold text-banknote-navy mb-2 uppercase tracking-wide">Commercially Compliant</h3>
                    <p className="text-slate-600">Designed with strict adherence to Australian regulations. Our props clearly state they are for motion picture use, ensuring your sets are legally compliant without sacrificing visual realism.</p>
                  </div>
                </article>
                <article className="flex gap-6 items-start">
                  <div className="shrink-0 w-12 h-12 bg-banknote-pink text-white rounded-lg flex items-center justify-center font-black text-xl shadow-md">3</div>
                  <div>
                    <h3 className="text-xl font-bold text-banknote-navy mb-2 uppercase tracking-wide">Fast Domestic Dispatch</h3>
                    <p className="text-slate-600">Shoots move fast. We warehouse our stock locally in Australia, offering overnight express shipping for urgent production deadlines.</p>
                  </div>
                </article>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SEO CONTENT SECTION - LOCATIONS */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-black text-center text-banknote-navy mb-12 uppercase tracking-wide">Supplying Productions Across Australia</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {['Sydney', 'Melbourne', 'Brisbane', 'Gold Coast', 'Perth', 'Adelaide'].map((city) => (
              <Link key={city} href={`/locations/${city.toLowerCase().replace(' ', '-')}`} className="p-4 bg-slate-50 border border-slate-200 rounded-lg text-center hover:border-banknote-green hover:shadow-lg transition-all">
                <span className="font-bold text-slate-700 uppercase tracking-widest text-sm">{city}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

    </>
  );
}
