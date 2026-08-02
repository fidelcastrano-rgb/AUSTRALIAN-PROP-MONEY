import { Shield, Lock, Eye, FileText, Globe, RefreshCw } from 'lucide-react';

export default function PrivacyPolicyPage() {
  const lastUpdated = "June 2026";

  return (
    <div className="bg-slate-50 min-h-screen py-16 font-sans">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Breadcrumb & Title */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-banknote-green-light text-banknote-green rounded-full text-xs font-semibold mb-4">
            <Shield className="w-3.5 h-3.5" />
            <span>Secure & Private Fulfillments</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-banknote-navy tracking-tight mb-4">Privacy Policy</h1>
          <p className="text-gray-500 text-sm font-medium">Last Updated: {lastUpdated}</p>
        </div>

        {/* Content Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 md:p-12 space-y-10 text-slate-700">
          
          {/* Brief Intro */}
          <div className="border-b border-slate-100 pb-8">
            <p className="text-lg leading-relaxed text-gray-700">
              At <strong>Prop Counterfeit Notes</strong> (also operating as <strong>Australian Prop Money</strong>), your privacy is of paramount importance. Because we supply high-quality film props and replica bills to production studios, theater groups, marketing agencies, and educational institutions, we handle all transaction and custom request data with the utmost security and confidentiality.
            </p>
            <p className="mt-4 text-sm text-gray-500">
              This Privacy Policy explains how our platform collects, uses, protects, and discloses your personal information when you visit our website, place orders for our prop currency, or contact our support representatives (including via WhatsApp).
            </p>
          </div>

          {/* Section 1 */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-lg bg-banknote-green-light flex items-center justify-center text-banknote-green shrink-0">
                <FileText className="w-4 h-4" />
              </div>
              <h2 className="text-2xl font-bold text-banknote-navy">1. Information We Collect</h2>
            </div>
            <p className="mb-4">
              We collect information to provide high-quality services and fulfill order deliveries smoothly. This includes:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                <h3 className="font-bold text-banknote-navy text-sm uppercase tracking-wide mb-2">Personal Identifiers</h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Name, shipping/billing addresses, email address, phone number (used to coordinate package delivery and send secure tracking coordinates).
                </p>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                <h3 className="font-bold text-banknote-navy text-sm uppercase tracking-wide mb-2">Communication History</h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Records of your design inquiries, custom order details requested via WhatsApp (+61468187831), contact forms, or email messages.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                <h3 className="font-bold text-banknote-navy text-sm uppercase tracking-wide mb-2">Payment Details</h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Billing information processed using secure PCI-DSS compliant third-party gateways. We do not store full credit card numbers or raw routing codes on our servers.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                <h3 className="font-bold text-banknote-navy text-sm uppercase tracking-wide mb-2">Device & Technical Info</h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  IP addresses, browser configurations, active session activity, and device identifiers collected automatically to enhance user interface responsiveness.
                </p>
              </div>
            </div>
          </div>

          {/* Section 2 */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-lg bg-banknote-green-light flex items-center justify-center text-banknote-green shrink-0">
                <Eye className="w-4 h-4" />
              </div>
              <h2 className="text-2xl font-bold text-banknote-navy">2. How We Use Your Information</h2>
            </div>
            <p className="mb-4">
              We use your personal information strictly for legitimate commercial and regulatory verification purposes:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li><strong>Fulfillment & Customs:</strong> To package, bundle, and secure transition routes for your prop currency stacks to various regions worldwide.</li>
              <li><strong>WhatsApp Correspondence:</strong> To quickly coordinate production timelines, draft proofs for custom bills (such as specific serial numbers, custom branding labels), and provide instant customer support.</li>
              <li><strong>Legal Compliance Audits:</strong> To verify that our customers are purchasing props strictly for legitimate creative, educational, or theatrical media fields.</li>
              <li><strong>Fraud Detection:</strong> To prevent illegal attempts to utilize our high-fidelity media designs for fraudulent interactions or activities in real-world retail networks.</li>
            </ul>
          </div>

          {/* Special Compliance Callout */}
          <div className="bg-amber-50 rounded-xl p-6 border border-amber-200">
            <h3 className="text-lg font-bold text-amber-900 mb-2 flex items-center gap-2">
              <Shield className="w-5 h-5 text-amber-600 shrink-0" />
              Special Disclosure Regarding Law Enforcement
            </h3>
            <p className="text-amber-800 text-sm leading-relaxed">
              Because our prop banknotes are styled as highly premium on-camera replicas, we operate under explicit guidelines set by regulatory authorities. We maintain absolute transparency with financial investigative agencies. In the rare event of suspected criminal intent, counterfeit injection attempts, or legal subpoena, we reserve the right to share purchaser records, correspondence, and delivery locations with relevant federal officials or local law enforcement.
            </p>
          </div>

          {/* Section 3 */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-lg bg-banknote-green-light flex items-center justify-center text-banknote-green shrink-0">
                <Lock className="w-4 h-4" />
              </div>
              <h2 className="text-2xl font-bold text-banknote-navy">3. Security of Your Information</h2>
            </div>
            <p className="mb-4">
              We secure your data using advanced encryption protocols during network transmission (SSL/TLS connection suites). Our production servers are behind enterprise-grade firewalls, and employee access to client order lists is restricted strictly to account handling staff.
            </p>
            <p>
              Please note that while we implement robust digital safeguards, no technical network transmission is 100% immune to outer interference. We recommend safeguarding your account passwords and maintaining secure channels during custom discussions on third-party instant messengers like WhatsApp.
            </p>
          </div>

          {/* Section 4 */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-lg bg-banknote-green-light flex items-center justify-center text-banknote-green shrink-0">
                <Globe className="w-4 h-4" />
              </div>
              <h2 className="text-2xl font-bold text-banknote-navy">4. Data Sharing and Third Parties</h2>
            </div>
            <p className="mb-4">
              We do not sell, rent, or lease our customer database to third-party marketing companies. We only share essential details with third-party service providers required for:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Courier Services:</strong> Sharing address coordinates with regional shipping networks (DHL, FedEx, Australia Post, etc.) for physical package delivery.</li>
              <li><strong>Financial Gateways:</strong> Safe token transmission with billing processors to settle orders without credit card details leaks.</li>
            </ul>
          </div>

          {/* Section 5 */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-lg bg-banknote-green-light flex items-center justify-center text-banknote-green shrink-0">
                <RefreshCw className="w-4 h-4" />
              </div>
              <h2 className="text-2xl font-bold text-banknote-navy">5. Your Privacy Rights</h2>
            </div>
            <p className="mb-4">
              Depending on your country of residence (such as Australia, Canada, the United Kingdom, or various jurisdictions within the European Union), you may possess specific rights regarding your personal information, including:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Right to Access:</strong> Request a copy of the personal information we maintain in your profile records.</li>
              <li><strong>Right to Rectification:</strong> Edit or correct details in your delivery addresses or custom product schedules.</li>
              <li><strong>Right to Erasure:</strong> Request the deletion of order histories or personal accounts.</li>
            </ul>
            <p className="mt-4">
              To exercise these privileges or question us regarding detail protection, reach our administration team directly at <strong>info@australianpropsmoney.com</strong>.
            </p>
          </div>

        </div>

        {/* Footer Contact Callout */}
        <div className="bg-slate-100 rounded-2xl p-6 text-center border border-slate-200 mt-8">
          <p className="text-sm text-gray-600">
            Have questions about our data security operations or custom orders privacy?
          </p>
          <p className="text-sm font-semibold text-banknote-navy mt-2">
            Contact us at <span className="text-banknote-green">info@australianpropsmoney.com</span> or via WhatsApp <span className="text-banknote-green">+61468187831</span>
          </p>
        </div>

      </div>
    </div>
  );
}
