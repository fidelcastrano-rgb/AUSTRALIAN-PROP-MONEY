import Link from 'next/link';

export default function CompliancePage() {
  return (
    <div className="bg-white min-h-screen py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-black text-banknote-navy mb-8">Legal & Compliance Information</h1>
        
        <div className="prose prose-lg text-gray-700 max-w-none">
          <p className="lead text-xl text-gray-900 font-medium mb-8">
            Australian Prop Money operates with strict adherence to local and international guidelines regarding the reproduction of currency for creative use.
          </p>

          <h2 className="text-2xl font-bold text-banknote-navy mt-10 mb-4">Intended Use Exclusively</h2>
          <p>
            Our products are manufactured and sold <strong>strictly</strong> for the following legal purposes:
          </p>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li>Cinematography (Film and Television productions)</li>
            <li>Photography, advertising, and marketing</li>
            <li>Theatrical stage productions</li>
            <li>Educational training (retail, casino, and banking simulations)</li>
            <li>Novelty and display</li>
          </ul>

          <div className="bg-red-50 p-6 rounded-lg border border-red-200 my-8">
            <h3 className="text-xl font-bold text-red-900 mb-2">Prohibited Use & Federal Law</h3>
            <p className="text-red-800">
              <strong>It is a federal crime</strong> to attempt to use prop money to make purchases, deposit in financial institutions, or deceive individuals into believing it is legal tender. Australian Prop Money cooperates fully with all law enforcement agencies globally. If we suspect attempting unlawful use of our products, we reserve the right to cancel orders and report the purchaser to the appropriate authorities.
            </p>
          </div>

          <h2 className="text-2xl font-bold text-banknote-navy mt-10 mb-4">Design Differences</h2>
          <p>
            While our props are designed to look excellent on screen, they are intentionally distinct from real currency:
          </p>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li>Prominent disclaimers such as &quot;FOR MOTION PICTURE USE ONLY&quot; and &quot;NOT LEGAL TENDER&quot; are integrated into the design.</li>
            <li>Material composition (paper stock vs polymer).</li>
            <li>Alteration of historical figures, signatures, and intricate micro-printing present on real banknotes.</li>
            <li>Absence of genuine security features (clear windows, holograms, UV ink).</li>
          </ul>

          <h2 className="text-2xl font-bold text-banknote-navy mt-10 mb-4">Purchaser Responsibility</h2>
          <p>
            By purchasing from Australian Prop Money, you (the buyer) agree to assume all liability and responsibility for the use of the product. You agree not to use the product in any illegal manner and hold Australian Prop Money, its owners, and employees harmless from any and all legal action that may arise from the misuse of these novelty products.
          </p>
        </div>
      </div>
    </div>
  );
}
