import Link from 'next/link';

export const metadata = {
  title: 'About Us',
  description: 'Learn about Australian Prop Money, the leading supplier of high-quality production currency for film, television, and photography across Australia.',
};

export default function AboutPage() {
  return (
    <div className="bg-white">
      {/* Header */}
      <div className="bg-banknote-navy text-white py-16 lg:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-black mb-6">Built for the Screen. Trusted by the Industry.</h1>
          <p className="text-xl text-gray-300">
            Providing commercial-grade prop currency for Australia&apos;s leading film productions, educational institutions, and creative agencies.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12 text-lg text-gray-700 leading-relaxed">
        
        <section>
          <h2 className="text-3xl font-bold text-banknote-navy mb-6">Our Story</h2>
          <p className="mb-4">
            Australian Prop Money was founded with a singular mission: to provide the local film and television industry with high-quality, legally compliant prop currency that holds up to the scrutiny of modern high-definition cinematography.
          </p>
          <p>
            Before our launch, productions operating in Sydney, Melbourne, and the Gold Coast often struggled with sourcing realistic local currency props, resorting either to poor-quality prints or risky alternatives. We recognised the need for a dedicated, professional supplier who understood both the technical requirements of the camera and the legal compliance required by Australian authorities.
          </p>
        </section>

        <section className="bg-brand-gray p-8 rounded-xl border border-gray-100">
          <h2 className="text-2xl font-bold text-banknote-navy mb-4">Our Commitment to Compliance</h2>
          <p className="mb-4">
            We operate in a highly regulated space, and we take our obligations seriously. Our products are meticulously designed to ensure they represent &quot;money&quot; beautifully on camera while remaining unmistakably distinct from legal tender upon physical inspection.
          </p>
          <p>
            <strong>All our products proudly display required compliance text</strong>, possess altered dimensions where necessary, and use proprietary art assets that emulate—but never unlawfully copy—genuine designs. We support the creative arts while protecting the integrity of the Australian currency system.
          </p>
        </section>

        <section>
          <h2 className="text-3xl font-bold text-banknote-navy mb-6">Who We Serve</h2>
          <ul className="list-disc pl-6 space-y-3">
            <li><strong>Film & Television Productions:</strong> From indie short films to massive studio features requiring duffel bags of cash.</li>
            <li><strong>Music Video Directors:</strong> Providing visually striking visual assets for artistic expression.</li>
            <li><strong>Professional Photographers:</strong> Matte-finish notes perfect for editorial and fashion shoots.</li>
            <li><strong>Theatre Companies:</strong> Durable stage props that read clearly from the back row.</li>
            <li><strong>Training Seminars & Seminars:</strong> Realistic physical handling aids for retail loss-prevention and casino dealer training.</li>
          </ul>
        </section>

        <section className="text-center pt-8 border-t border-gray-200">
          <h2 className="text-2xl font-bold text-banknote-navy mb-6">Ready to outfit your next production?</h2>
          <div className="flex justify-center gap-4">
             <Link href="/products" className="inline-flex justify-center items-center px-6 py-3 bg-banknote-green text-white rounded-md font-semibold hover:bg-banknote-green-dark transition-colors">
                View Catalog
              </Link>
              <Link href="/contact" className="inline-flex justify-center items-center px-6 py-3 bg-transparent border-2 border-banknote-navy text-banknote-navy rounded-md font-semibold hover:bg-banknote-navy hover:text-white transition-colors">
                Contact Sales
              </Link>
          </div>
        </section>

      </div>
    </div>
  );
}
