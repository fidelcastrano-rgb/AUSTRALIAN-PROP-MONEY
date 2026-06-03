import Link from 'next/link';

export async function generateStaticParams() {
  const cities = ['sydney', 'melbourne', 'brisbane', 'gold-coast', 'perth', 'adelaide', 'canberra'];
  return cities.map((city) => ({
    city: city,
  }));
}

export async function generateMetadata(props: { params: Promise<{ city: string }> }) {
  const params = await props.params;
  const cityName = params.city.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  return {
    title: `Prop Money in ${cityName} | Fast Local Shipping`,
    description: `Leading supplier of film and TV production prop money in ${cityName}. Express delivery available directly to your set or studio in ${cityName}.`,
  };
}

export default async function LocationPage(props: { params: Promise<{ city: string }> }) {
  const params = await props.params;
  const cityName = params.city.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <div className="bg-banknote-navy text-white py-20 bg-[url('https://superpropnotes.com/wp-content/uploads/2023/06/cd7072b9df060e9841a84c6ced00be46.jpg')] bg-cover bg-center relative">
        <div className="absolute inset-0 bg-banknote-navy/90" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
          <h1 className="text-4xl md:text-5xl font-black mb-6">Prop Money Supplier for {cityName} Productions</h1>
          <p className="text-xl text-gray-300">
            Providing commercial-grade, film-ready prop currency for cinema, television, and creative agencies operating in {cityName}.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="prose prose-lg text-gray-700 max-w-none">
          <p>
            When shooting in {cityName}, time is of the essence. Australian Prop Money provides premium quality production currency with lightning fast delivery options to sets across {cityName} and surrounding areas.
          </p>

          <h2 className="text-3xl font-bold text-banknote-navy mt-12 mb-6">Why {cityName} Productions Choose Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-base">
            <div className="bg-brand-gray p-6 rounded-lg border border-gray-100">
              <h3 className="font-bold text-xl text-banknote-green mb-2">Cinematic Quality</h3>
              <p>Meticulously printed to handle the scrutiny of 8K cameras without distracting glare. Perfect for high-end shoots in {cityName} studios.</p>
            </div>
            <div className="bg-brand-gray p-6 rounded-lg border border-gray-100">
              <h3 className="font-bold text-xl text-banknote-green mb-2">Legal Compliance</h3>
              <p>Avoid production shutdowns. Our notes clearly state they are for motion picture use, ensuring your {cityName} shoot remains legally compliant.</p>
            </div>
            <div className="bg-brand-gray p-6 rounded-lg border border-gray-100">
              <h3 className="font-bold text-xl text-banknote-green mb-2">Expedited Shipping</h3>
              <p>Need it tomorrow? We offer overnight express shipping to {cityName} addresses for standard orders placed before 2pm.</p>
            </div>
            <div className="bg-brand-gray p-6 rounded-lg border border-gray-100">
              <h3 className="font-bold text-xl text-banknote-green mb-2">Bulk Availability</h3>
              <p>Whether you need a single stack for a close-up or duffel bags full for a bank heist scene, we keep high volumes in stock.</p>
            </div>
          </div>

          <div className="mt-16 text-center">
            <Link href="/products" className="inline-flex justify-center items-center px-8 py-4 bg-banknote-green text-white rounded-md font-semibold text-lg hover:bg-banknote-green-dark transition-colors shadow-lg">
              Shop The {cityName} Catalog
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
