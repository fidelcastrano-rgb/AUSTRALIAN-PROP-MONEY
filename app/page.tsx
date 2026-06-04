import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { 
  CheckCircle, 
  ShieldCheck, 
  Truck, 
  Film, 
  Camera, 
  Clapperboard, 
  Award, 
  HeartHandshake, 
  MapPin, 
  HelpCircle, 
  Info, 
  Check, 
  ArrowRight 
} from "lucide-react";
import { organizationSchema, websiteSchema, localBusinessSchema } from "@/lib/schema";
import { categories } from "@/lib/data";

// Page-specific SEO metadata to optimize for Google's indexer
export const metadata: Metadata = {
  title: "Australian Prop Money | Custom Film-Ready Prop Money Reels & Replica Bills",
  description: "Shop premium Australian prop money designed specifically for film, TV, theatrical plays, commercials, and training simulations. Highly realistic camera-ready movie notes with express overnight dispatch to Sydney, Melbourne, Brisbane, and Gold Coast.",
  keywords: [
    "prop Money",
    "australian prop money",
    "movie money Australia",
    "replica banknotes Sydney",
    "theatrical dollar bills Brisbane",
    "buy realistic play money Melbourne",
    "fake australian dollars for film",
    "novelty money Gold Coast",
    "production cash stacks",
    "cashier training materials Australia"
  ],
  alternates: {
    canonical: "https://australianpropsmoney.com",
  }
};

// FAQ Schema for Rich Snippets / Google FAQ Card results
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is \"Australian Prop Money\" & How is it Used on Set?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Australian prop money is high-fidelity replica currency specifically crafted for television shows, movie productions, theatrical plays, commercials, and training simulations. Our props replicate the appearance of real Australian dollars under digital camera sensors and high-definition project lighting. They are calibrated to provide complete realism on camera while remaining fully compliant with regional counterfeiting regulations."
      }
    },
    {
      "@type": "Question",
      "name": "Is it legal to buy and use prop money in Australia?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, buying, possessing, and using prop money is 100% legal in Australia, provided it is used strictly for its intended artistic, training, educational, or film production purposes. All our bills integrate mandatory legal safeguards, such as printed 'FOR MOTION PICTURE USE ONLY' and 'NOT LEGAL TENDER' disclaimers, customized serial numbers, altered scale sizes compared to federal bills, and the total omission of actual federal polymer security features like holographic optical ribbons. They are calibrated for camera lenses, not cash sorting machines. Attempting to use prop money to purchase real goods or settle debts is a federal crime."
      }
    },
    {
      "@type": "Question",
      "name": "What is the difference between real banknotes and prop money?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Unlike real banknotes produced on highly guarded polymer and metallic ribbons with micro-printing and ultraviolet active layers, our prop money is manufactured using calibrated matte paper or engineered media films with specialized anti-glare finishes. This eliminates the camera refraction of traditional paper while ensuring they look genuine on screen from a distance, yet are instantly identifiable as legal props to the touch, preventing unauthorized circulation."
      }
    },
    {
      "@type": "Question",
      "name": "How fast is delivery to Sydney, Melbourne, Brisbane, and the Gold Coast?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "We offer express dispatch across the nation. Standard orders placed before 2 PM AEST are prepared, sealed in completely discrete non-descriptive packaging, and dispatched within 24 hours. Express overnight courier routes deliver straight to studios and set addresses in Melbourne, Sydney, Brisbane, Gold Coast, and surrounding major production hubs."
      }
    },
    {
      "@type": "Question",
      "name": "Do you offer bulk discounts on large prop money stacks?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. Whether your film requires single stacks for close-up cash counts or full duffel bags of multi-million-dollar cash stacks for high-stakes bank heist scenes, we have configured high-volume prop books and cash bundles. Custom serial numbers, specific wrap bands, and vintage layouts can be coordinated directly with our design team via WhatsApp."
      }
    }
  ]
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([organizationSchema, websiteSchema, localBusinessSchema, faqSchema]),
        }}
      />
      
      {/* HERO SECTION */}
      <section className="grid grid-cols-1 lg:grid-cols-12 min-h-[600px] border-b border-slate-200 bg-white" id="hero-section">
        
        <div className="col-span-1 lg:col-span-7 flex flex-col justify-center px-6 sm:px-12 lg:p-16 xl:p-24 bg-gradient-to-br from-white to-slate-50 order-2 lg:order-1 relative z-10">
          <div className="mb-6 inline-flex self-start items-center bg-banknote-gold/10 text-[#856404] px-4 py-2 rounded text-xs font-bold uppercase tracking-tighter italic">
            Official Film & TV Production Supplier
          </div>
          
          <h1 className="text-4xl sm:text-5xl lg:text-[58px] font-black text-banknote-navy leading-[1.1] mb-6">
            Realistic <span className="text-banknote-green">Prop Money</span> & Australian Prop Money for Film Productions
          </h1>
          
          <p className="text-lg text-slate-600 mb-10 leading-relaxed max-w-xl">
            Premium, highly realistic <strong>australian prop money</strong> designed exclusively for cinematic camera sweeps, theatrical actors, cashier training, and high-contrast photography under strict legal compliance.
          </p>
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <Link href="/products" className="bg-banknote-green text-white px-10 py-5 rounded-lg font-black text-lg shadow-xl shadow-banknote-green/20 hover:scale-[1.02] transition-transform text-center w-full sm:w-auto uppercase">
              Shop The Catalog
            </Link>
            <Link href="/contact" className="hidden sm:flex border-2 border-slate-200 text-slate-600 px-8 py-4 rounded-lg font-bold hover:border-banknote-navy hover:text-banknote-navy transition-colors items-center justify-center">
              Request Production Quote
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
      <section className="h-auto md:h-12 py-4 md:py-0 bg-slate-50 border-b border-slate-200 flex items-center justify-around flex-wrap gap-4 px-4 text-[11px] font-bold uppercase tracking-widest text-slate-500" id="trust-signals">
        <span className="flex items-center gap-2"><span className="w-2 h-2 bg-banknote-gold rounded-full"></span> Australian Owned</span>
        <span className="flex items-center gap-2"><span className="w-2 h-2 bg-banknote-green rounded-full"></span> Fast Dispatch</span>
        <span className="flex items-center gap-2"><span className="w-2 h-2 bg-banknote-navy rounded-full"></span> Production Ready</span>
        <span className="flex items-center gap-2"><span className="w-2 h-2 bg-banknote-pink rounded-full"></span> Secured Checkout</span>
      </section>

      {/* FEATURED CATEGORIES */}
      <section className="py-24 bg-white border-b border-slate-200" id="categories-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-banknote-navy mb-4 tracking-tight">Shop by Production Needs</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto font-medium">
              Select the perfect prop money configuration for your specific creative or educational requirements.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((c) => (
              <Link key={c.id} href={`/category/${c.slug}`} className="group flex flex-col rounded-xl overflow-hidden border border-slate-200 bg-white shadow-sm hover:shadow-2xl transition-all duration-300" id={`category-card-${c.id}`}>
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
      <section className="py-24 bg-gradient-to-b from-slate-50 to-white border-b border-slate-200" id="why-choose-us">
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
                <article className="flex gap-6 items-start" id="feature-detail-1">
                  <div className="shrink-0 w-12 h-12 bg-banknote-green text-white rounded-lg flex items-center justify-center font-black text-xl shadow-md">1</div>
                  <div>
                    <h3 className="text-xl font-bold text-banknote-navy mb-2 uppercase tracking-wide">Immaculate Detail & Quality</h3>
                    <p className="text-slate-600">Our notes are printed on high-grade paper using offset lithography, mimicking the structural feel and visual fidelity required for 8K cinematic cameras.</p>
                  </div>
                </article>
                <article className="flex gap-6 items-start" id="feature-detail-2">
                  <div className="shrink-0 w-12 h-12 bg-banknote-gold text-white rounded-lg flex items-center justify-center font-black text-xl shadow-md">2</div>
                  <div>
                    <h3 className="text-xl font-bold text-banknote-navy mb-2 uppercase tracking-wide">Commercially Compliant</h3>
                    <p className="text-slate-600">Designed with strict adherence to Australian regulations. Our props clearly state they are for motion picture use, ensuring your sets are legally compliant without sacrificing visual realism.</p>
                  </div>
                </article>
                <article className="flex gap-6 items-start" id="feature-detail-3">
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

      {/* COMPREHENSIVE SEO RICH CONTENT SECTION - INDUSTRIAL GUIDE */}
      <section className="py-24 bg-white border-b border-slate-200" id="industrial-seo-guide">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="prose prose-slate max-w-none space-y-12">
            
            {/* Guide Intro */}
            <div className="border-b border-slate-100 pb-10">
              <h2 className="text-3xl md:text-4xl font-black text-banknote-navy uppercase tracking-wide mb-6 leading-tight">
                State-Of-The-Art Prop Money For Modern Film Sets & Visual Media
              </h2>
              <p className="text-gray-700 text-base leading-relaxed">
                In modern high-definition filmmaking, resolution is everything. With digital cameras capturing scenes in 4K, 8K, and beyond, low-quality replica bills or substandard novelties are instantly exposed, ruining on-screen immersion. That is why professional directors, independent filmmakers, theatrical groups, and marketing teams demand authentic-looking <strong>prop money</strong>.
              </p>
              <p className="text-gray-700 text-base leading-relaxed mt-4">
                At our specialized design studio, we produce premium-grade <strong>australian prop money</strong> crafted to overcome the limitations of standard printers. By adjusting contrast curves, applying custom non-reflective matte sealants, and maintaining legal compliance layout ratios, we prepare movie cash rolls that feel natural in actors&apos; hands and capture beautifully under digital light sensors.
              </p>
            </div>

            {/* Layout Benefits */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-10">
              <div className="p-6 bg-slate-50 rounded-xl border border-slate-250">
                <div className="flex items-center gap-3 mb-3">
                  <Camera className="w-5 h-5 text-banknote-green shrink-0" />
                  <h3 className="font-bold text-lg text-banknote-navy uppercase tracking-wide">Refraction & Glare Elimination</h3>
                </div>
                <p className="text-sm text-gray-650 leading-relaxed">
                  Real polymer bank bills feature highly reflective microscopic coatings. Under intense production lights, these coatings refract lasers and light, creating unwanted flares on camera lenses. Our custom-milled prop banknotes integrate anti-glare coatings, keeping focus sharp on your performers and scenery.
                </p>
              </div>

              <div className="p-6 bg-slate-50 rounded-xl border border-slate-250">
                <div className="flex items-center gap-3 mb-3">
                  <Film className="w-5 h-5 text-banknote-green shrink-0" />
                  <h3 className="font-bold text-lg text-banknote-navy uppercase tracking-wide font-heading">On-Set Narrative Realism</h3>
                </div>
                <p className="text-sm text-gray-650 leading-relaxed">
                  Whether filling a vault for an action-packed heist movie or handling individual clean notes in close-up briefcase captures, the tactile sweep matters. Our prop cash stacks are optimized to provide natural weight and flex, mimicking real stacks perfectly during high-intensity takes.
                </p>
              </div>
            </div>

            {/* Compliance Section */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 border-l-4 border-banknote-gold pl-4 py-1">
                <h3 className="text-2xl font-black text-banknote-navy uppercase tracking-wide">
                  Strict Compliance with Regional Currency Regulations
                </h3>
              </div>
              <p className="text-gray-700 text-base leading-relaxed">
                Navigating replication codes while trying to buy fake money online can be confusing. The Reserve Bank of Australia (RBA) guidelines exist to prevent any counterfeit from entering real retail ecosystems. Our production is dedicated to 100% legal on-set operations.
              </p>
              <p className="text-gray-700 text-base leading-relaxed">
                To guarantee your scene can be filmed safely without regulatory interruptions, our replica dollar stacks incorporate modern design safeguards:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-sm text-gray-650">
                <li><strong>Explicit Legal Disclaimers:</strong> Each bill carries printed compliance indicators such as &quot;FOR MOTION PICTURE USE ONLY&quot; on both sides, making its nature immediately discernible upon close inspection.</li>
                <li><strong>Modified Portraiture Frameworks:</strong> Historic portraits are adapted with unique artistic details, distinguishing them from genuine national reserve currency.</li>
                <li><strong>Altered Dimensions and Proportions:</strong> Scaling margins list minor subtle variations, and optical holographic security lines are stylized as flat prints that mimic camera reflections without implementing true metallic film technology.</li>
                <li><strong>Zero Machine Integrity:</strong> Our notes will never pass real ATM readers, cashier cash scanners, or commercial vending loops, protecting the public while keeping your production fully clear of any legal concerns.</li>
              </ul>
            </div>

            {/* Local Hubs Content Section */}
            <div className="space-y-8 pt-6 border-t border-slate-100">
              <h3 className="text-2xl font-black text-banknote-navy uppercase tracking-wide flex items-center gap-2">
                <MapPin className="w-6 h-6 text-banknote-green" />
                Local Distribution Networks Supporting Australian Creators
              </h3>
              <p className="text-gray-700 text-base leading-relaxed">
                Our operations are tailored to support the active film and creative production communities in every major metropolitan hub across Australia. We coordinate overnight lines and immediate dispatch to guarantee your filming schedule remains intact:
              </p>

              <div className="space-y-6">
                <div>
                  <h4 className="font-bold text-lg text-banknote-navy uppercase tracking-wider mb-2">Sydney & New South Wales (NSW)</h4>
                  <p className="text-sm text-gray-650 leading-relaxed">
                    Home to major studio lots and historic local series, Sydney has a fast-paced filming ecosystem. From indie crime thrillers in Surry Hills to complex major films at Fox Studios in Moore Park, we supply prop cash stacks on tight deadlines. Local productions can coordinate directly for urgent next-day courier drop-offs or custom series serializations to keep filming setups moving efficiently.
                  </p>
                </div>

                <div>
                  <h4 className="font-bold text-lg text-banknote-navy uppercase tracking-wider mb-2">Melbourne & Victoria</h4>
                  <p className="text-sm text-gray-650 leading-relaxed">
                    Melbourne is known for its artistic television series, commercial ads, and music videos. We supply film-ready props to sets in Fitzroy, St Kilda, and Docklands Studios. Melbourne coordinators rely on our discrete packaging and rapid transit buffers, ensuring prop money is ready for the call sheet.
                  </p>
                </div>

                <div>
                  <h4 className="font-bold text-lg text-banknote-navy uppercase tracking-wider mb-2">Brisbane & Gold Coast (Queensland)</h4>
                  <p className="text-sm text-gray-650 leading-relaxed">
                    The Gold Coast is a global filmmaking hub, housing Village Roadshow Studios and hosting massive blockbusters with heavy stunt work. Brisbane&apos;s agencies focus on training films and corporate commercials. Our team provides high-volume prop currency in bundles, packs, and loose notes, helping local art directors build rich, realistic scenes.
                  </p>
                </div>

                <div>
                  <h4 className="font-bold text-lg text-banknote-navy uppercase tracking-wider mb-2">Adelaide, Perth & Canberra</h4>
                  <p className="text-sm text-gray-650 leading-relaxed">
                    From Western Australia&apos;s commercial hubs to South Australia&apos;s respected film boards, we support creative agencies nationwide. Whether you are filming a tense short film in Fremantle, a theater drama in Adelaide, or a government training scenario in Canberra, our streamlined logistics guarantee secure, plain, discrete packaging arrives exactly when required.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* DETAILED FAQ CONTENT ACCODION (INTERACTIVE WORK FOR GOOGLE INDEX CRAWLERS) */}
      <section className="py-24 bg-slate-50 border-b border-slate-200" id="homepage-faq-section">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-banknote-green-light text-banknote-green rounded-full text-xs font-semibold mb-4">
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Have Questions? We Have Answers</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-banknote-navy tracking-tight mb-4 uppercase">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-600 font-medium text-base">
              Everything you need to know about legally buying and using authentic-looking <strong>prop money</strong> and <strong>australian prop money</strong>.
            </p>
          </div>

          <div className="space-y-6">
            
            <div className="bg-white p-6 md:p-8 rounded-2xl border border-slate-200 shadow-sm" id="faq-item-1">
              <h3 className="text-lg md:text-xl font-bold text-banknote-navy mb-3 flex items-start gap-3">
                <span className="text-banknote-green font-black">Q.</span>
                <span>What is the legal framework surrounding Australian prop money?</span>
              </h3>
              <p className="text-gray-700 text-sm leading-relaxed pl-8">
                Replica currency is legal to sell, purchase, and use across Australia as long as there is <strong>no intent to deceive</strong>. Our <strong>australian prop money</strong> features distinct changes, including the exclusion of actual holographic details, size offsets, and prominent &quot;FOR MOTION PICTURE USE ONLY&quot; warnings. These design choices ensure our props are legally compliant.
              </p>
            </div>

            <div className="bg-white p-6 md:p-8 rounded-2xl border border-slate-200 shadow-sm" id="faq-item-2">
              <h3 className="text-lg md:text-xl font-bold text-banknote-navy mb-3 flex items-start gap-3">
                <span className="text-banknote-green font-black">Q.</span>
                <span>Does the prop money look realistic in high-definition (HD) zoom close-ups?</span>
              </h3>
              <p className="text-gray-700 text-sm leading-relaxed pl-8">
                Yes! Our prop banknotes are crafted to look incredibly authentic under professional camera rigs and lighting. They feature excellent contrast curves and sharp registration lines. However, extreme macro zooms will naturally reveal the legally required disclaimers. Our notes offer the ideal balance of realistic presentation and legal compliance.
              </p>
            </div>

            <div className="bg-white p-6 md:p-8 rounded-2xl border border-slate-200 shadow-sm" id="faq-item-3">
              <h3 className="text-lg md:text-xl font-bold text-banknote-navy mb-3 flex items-start gap-3">
                <span className="text-banknote-green font-black">Q.</span>
                <span>Can I use these prop notes for cashier training or educational purposes?</span>
              </h3>
              <p className="text-gray-750 text-sm leading-relaxed pl-8">
                Absolutely. Our double-sided replica bills are highly popular with retail chains, banking simulation programs, and school operations. They allow trainees to practice handling and counting cash bundles safely and realistically without the security risks of on-site real currency reserves.
              </p>
            </div>

            <div className="bg-white p-6 md:p-8 rounded-2xl border border-slate-200 shadow-sm" id="faq-item-4">
              <h3 className="text-lg md:text-xl font-bold text-banknote-navy mb-3 flex items-start gap-3">
                <span className="text-banknote-green font-black">Q.</span>
                <span>How are shipments packaged? Will people know what is inside?</span>
              </h3>
              <p className="text-gray-700 text-sm leading-relaxed pl-8">
                Your confidentiality is our absolute priority. All ordered items are shipped in <strong>completely plain, non-descriptive packaging</strong> with zero details, logos, or references to &quot;prop money&quot;, &quot;replicas&quot;, or &quot;counterfeits&quot; on the package box. Receipts and tracking emails are also handled discretely.
              </p>
            </div>

            <div className="bg-white p-6 md:p-8 rounded-2xl border border-slate-200 shadow-sm" id="faq-item-5">
              <h3 className="text-lg md:text-xl font-bold text-banknote-navy mb-3 flex items-start gap-3">
                <span className="text-banknote-green font-black">Q.</span>
                <span>What happens if a prop money package gets delayed or lost?</span>
              </h3>
              <p className="text-gray-700 text-sm leading-relaxed pl-8">
                We maintain an exceptional delivery success rate. In the rare event a package is declared officially lost in transit by the carrier, we will immediately arrange a <strong>free replacement shipment</strong>. Our support team coordinates via email or WhatsApp to ensure you receive your movie prop stacks on time for your production.
              </p>
            </div>

          </div>

          <div className="mt-16 bg-banknote-navy text-white text-center p-8 rounded-2xl border border-slate-800 shadow-xl" id="faq-cta-footer">
            <h3 className="text-2xl font-bold mb-4 uppercase tracking-wider font-heading">Need Custom-Tailored Serializations or Custom Designs?</h3>
            <p className="mb-6 text-gray-300 max-w-2xl mx-auto text-sm leading-relaxed">
              If your filming script calls for vintage bills, fictional futuristic credits, or specific currency modifications, we have custom design experts waiting to collaborate.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/contact" className="inline-flex justify-center items-center gap-2 px-6 py-3 bg-banknote-green text-white rounded-lg font-bold hover:bg-banknote-green-light hover:text-banknote-navy transition-all uppercase text-sm">
                <span>Contact Creative Dept</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a href="https://wa.me/447341056054" className="inline-flex justify-center items-center gap-2 px-6 py-3 border border-white/20 hover:border-white/60 text-white rounded-lg font-bold transition-all text-sm uppercase">
                <span>Direct WhatsApp Chat</span>
              </a>
            </div>
          </div>

        </div>
      </section>

      {/* LOCATIONS QUICK INDEX HUB */}
      <section className="py-24 bg-white" id="locations-hub-index">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black text-banknote-navy uppercase tracking-wide">Supplying Productions Across Australia</h2>
            <div className="w-16 h-1 bg-banknote-green mx-auto mt-4 rounded"></div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
            {['Sydney', 'Melbourne', 'Brisbane', 'Gold Coast', 'Perth', 'Adelaide', 'Canberra'].map((city) => (
              <Link key={city} href={`/locations/${city.toLowerCase().replace(' ', '-')}`} className="p-4 bg-slate-50 border border-slate-200 rounded-lg text-center hover:border-banknote-green hover:shadow-lg transition-all" id={`location-hub-link-${city.toLowerCase().replace(' ', '-')}`}>
                <span className="font-bold text-slate-700 uppercase tracking-widest text-xs sm:text-sm">{city}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

    </>
  );
}
