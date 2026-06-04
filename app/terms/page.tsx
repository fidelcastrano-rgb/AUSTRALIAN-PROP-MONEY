import { FileText, AlertTriangle, Hammer, CheckSquare, ShieldCheck, Mail } from 'lucide-react';

export default function TermsOfServicePage() {
  const lastUpdated = "June 2026";

  return (
    <div className="bg-slate-50 min-h-screen py-16 font-sans">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-100 text-amber-850 rounded-full text-xs font-semibold mb-4">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
            <span className="text-amber-900 font-bold">Strict Legal Agreement</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-banknote-navy tracking-tight mb-4">Terms of Service</h1>
          <p className="text-gray-500 text-sm font-medium">Last Updated: {lastUpdated}</p>
        </div>

        {/* Core Terms Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 md:p-12 space-y-10 text-slate-700">
          
          {/* Brief Intro */}
          <div className="border-b border-slate-100 pb-8 text-slate-600">
            <p className="text-lg leading-relaxed font-medium text-gray-800">
              Welcome to <strong>Prop Counterfeit Notes Inc.</strong> (&quot;the Company,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;), operating online as <strong>Australian Prop Money</strong>. 
            </p>
            <p className="mt-4 text-sm leading-relaxed">
              By accessing our website, purchasing our film prop banknotes, or initiating custom orders via our support interfaces (including through WhatsApp), you agree to be bound by the following Terms of Service, all applicable laws and regulations, and agree that you are solely responsible for compliance with any local jurisdictions. If you do not agree with any of these terms, you are prohibited from using or purchasing from this site.
            </p>
          </div>

          {/* Section 1: Age & Eligibility */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-lg bg-banknote-green-light flex items-center justify-center text-banknote-green shrink-0">
                <CheckSquare className="w-4 h-4" />
              </div>
              <h2 className="text-2xl font-bold text-banknote-navy">1. User Eligibility & Purchase Agreement</h2>
            </div>
            <p className="mb-4">
              By placing an order for replica banknotes on our platform, you represents and warrant that:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-sm text-gray-600">
              <li>You are at least <strong>18 years of age</strong> and have the legal capacity to enter into a binding contract inside your country of residence.</li>
              <li>All profile info, billing addresses, and digital contacts provided to are completely accurate.</li>
              <li>You will use the products strictly for legitimate artistic, educational, training, theatrical, or novelty purposes.</li>
            </ul>
          </div>

          {/* Section 2: COMPLIANCE WARNING */}
          <div className="bg-red-50 rounded-xl p-6 border border-red-200 my-8">
            <div className="flex items-center gap-2 mb-3">
              <AlertTriangle className="w-6 h-6 text-red-600 shrink-0" />
              <h3 className="text-lg font-bold text-red-900">2. ABSOLUTE COMPLIANCE DISCLOSURE & LEGAL COMPLIANCE</h3>
            </div>
            <p className="text-red-800 text-sm leading-relaxed mb-4">
              Our replica banknotes are high-fidelity models specifically designed for cinematic camera captures and digital productions. They are <strong>NOT REAL CURRENCY</strong> and are completely useless as legal tender. 
            </p>
            <div className="space-y-3.5 text-xs text-red-850 font-medium">
              <p>🔴 <strong>Attempting to use prop money/replica bills to purchase goods, settle debts, or deposit into banks is a direct federal crime.</strong></p>
              <p>🔴 If you initiate such a transaction, you will face federal prosecution, significant fines, or heavy jail sentences.</p>
              <p>🔴 The Company maintains zero-tolerance for illicit financial injection attempts and coordinates fully with law enforcement groups globally, providing purchaser databases, payment logs, and chat transcripts when requested.</p>
            </div>
          </div>

          {/* Section 3: Product Description & Media Standards */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-lg bg-banknote-green-light flex items-center justify-center text-banknote-green shrink-0">
                <Hammer className="w-4 h-4" />
              </div>
              <h2 className="text-2xl font-bold text-banknote-navy">3. Product Design Specifications & Use</h2>
            </div>
            <p className="mb-4">
              To remain fully compliant with currency replica laws worldwide, our products are physical artistic models incorporating critical legal design safeguards:
            </p>
            <ul className="list-disc pl-6 space-y-2.5 text-sm text-gray-600">
              <li><strong>Text Warnings:</strong> Each banknote has clearly printed visible markings, e.g. &quot;FOR MOTION PICTURE USE ONLY&quot;, &quot;NOT LEGAL TENDER&quot;, or &quot;PROP NOTES&quot;.</li>
              <li><strong>Holograms and Details:</strong> Replicated security ribbons reflect camera lighting realistically but behave differently from real metallic films or complex plastic multi-layered holograms.</li>
              <li><strong>Materials:</strong> Prop dollars are produced on special dense stocks or tailored polymers that differ significantly to the touch from genuine federal polymer substrates. They do not trigger real ATM sensors or UV currency reader detectors.</li>
            </ul>
          </div>

          {/* Section 4: WhatsApp Orders & Payment Terms */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-lg bg-banknote-green-light flex items-center justify-center text-banknote-green shrink-0">
                <FileText className="w-4 h-4" />
              </div>
              <h2 className="text-2xl font-bold text-banknote-navy">4. Custom Drafting, Pricing, and Payments</h2>
            </div>
            <p className="mb-4">
              We provide dynamic scaling and customization options. When you make a request:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-sm text-gray-600">
              <li><strong>Quotes:</strong> Prices advertised are in AUD or USD depending on product specifications. Custom design quotes submitted via WhatsApp are valid for thirty (30) days.</li>
              <li><strong>Cancellations:</strong> Due to the customized nature of prop money bundles (packing specific counts, serial numbers, or banding), orders cannot be cancelled or modified once they have been dispatched.</li>
              <li><strong>Refusals:</strong> We reserve the absolute right to refuse service, cancel orders, or ban client profiles at our sole discretion should we suspect potentially unlawful redistribution.</li>
            </ul>
          </div>

          {/* Section 5: Limitation of Liability */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-lg bg-banknote-green-light flex items-center justify-center text-banknote-green shrink-0">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <h2 className="text-2xl font-bold text-banknote-navy">5. Limitation of Liability & Indemnification</h2>
            </div>
            <p className="mb-4">
              In no event shall Prop Counterfeit Notes Inc., its directors, employees, or distribution network partners be held liable for any damages (including, without limitation, direct or indirect legal prosecutions, financial losses, regulatory audits, or civil actions) arising out of the misuse of our novelty products.
            </p>
            <p className="text-sm bg-slate-50 border border-slate-200 rounded-lg p-4 my-4 leading-relaxed font-mono">
              BY AGREEING TO THESE TERMS, YOU EXPRESSLY PROMISE TO INDEMNIFY AND HOLD COMPLETELY HARMLESS THE COMPANY, ITS PARENT ORGANIZATION, AND ALL SUBSIDIARY STAFF AND WRITERS AGAINST ANY CLAIMS, LIABILITIES, JAIL TERMS, FINES, OR LAWSUITS ARISING DIRECTLY OR INDIRECTLY FROM YOUR USAGE, POSSESSION, OR CONVEYANCE OF PRODUCTS PURCHASED FROM THIS DOMAIN.
            </p>
          </div>

          {/* Section 6: Governing Law */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-lg bg-banknote-green-light flex items-center justify-center text-banknote-green shrink-0">
                <Hammer className="w-4 h-4" />
              </div>
              <h2 className="text-2xl font-bold text-banknote-navy">6. Governing Law</h2>
            </div>
            <p>
              These terms and conditions are governed by and construed in accordance with the laws of <strong>New South Wales, Australia</strong>, with supplemental alignment to currency compliance laws in USA, Canada, and the UK. You irrevocably submit to the exclusive jurisdiction of the state, federal, or administrative courts in those locations to settle any disputes.
            </p>
          </div>

        </div>

        {/* Action / Contact Bar */}
        <div className="bg-slate-100 rounded-2xl p-6 text-center border border-slate-200 mt-8">
          <p className="text-sm text-gray-600">
            For specific approvals or custom film prop clearance agreements, please interface directly with compliance:
          </p>
          <p className="text-sm font-semibold text-banknote-navy mt-2 flex items-center justify-center gap-2">
            <Mail className="w-4 h-4 text-banknote-green" />
            <span>info@australianpropsmoney.com</span>
            <span className="text-slate-300">|</span>
            <span>WhatsApp Group Support: +447341056054</span>
          </p>
        </div>

      </div>
    </div>
  );
}
