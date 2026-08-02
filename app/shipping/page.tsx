import { Truck, Shield, Clock, Box, Globe, RotateCcw, MessageSquare } from 'lucide-react';

export default function ShippingPolicyPage() {
  return (
    <div className="bg-slate-50 min-h-screen py-16 font-sans">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Title Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-banknote-green-light text-banknote-green rounded-full text-xs font-semibold mb-4">
            <Truck className="w-3.5 h-3.5 animate-bounce" />
            <span>Guaranteed Global Dispatched Transit</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-banknote-navy tracking-tight mb-4">Shipping & Delivery Policy</h1>
          <p className="text-gray-500 text-sm font-medium">Fast, Secure and 100% Discrete Shipping Worldwide</p>
        </div>

        {/* Shipping details container */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 md:p-12 space-y-10 text-slate-700">
          
          {/* Packaging Discretion Warning */}
          <div className="border border-banknote-green bg-banknote-green-light p-6 rounded-xl flex flex-col md:flex-row items-center gap-4 my-4">
            <Shield className="w-12 h-12 text-banknote-green shrink-0" />
            <div>
              <h3 className="font-bold text-banknote-navy text-lg mb-1">100% Secure & Discrete Packaging Guarantee</h3>
              <p className="text-sm text-gray-700 leading-relaxed">
                To respect the privacy of filmmakers, marketers, and production studios, we ship all orders in completely plain, secure packaging. There are <strong>no visual indicators, logos, or references</strong> to &quot;Prop Money&quot;, &quot;Counterfeit Notes&quot;, or currency replicas on the exterior envelope or shipping boxes. The return label lists a discrete commercial logistics address.
              </p>
            </div>
          </div>

          {/* Section 1: Transit speed */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-lg bg-banknote-green-light flex items-center justify-center text-banknote-green shrink-0">
                <Clock className="w-4 h-4" />
              </div>
              <h2 className="text-2xl font-bold text-banknote-navy">1. Delivery Times & Services</h2>
            </div>
            <p className="mb-4">
              All bundles are packed, sealed, and dispatched within twenty-four (24) hours of order approval. We cooperate with elite shipping carriers (including DHL Express, FedEx, UPS, and Australia Post) to ensure safe routes:
            </p>
            
            <div className="overflow-x-auto my-6 border border-slate-200 rounded-xl">
              <table className="w-full text-left text-sm border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-banknote-navy font-bold">
                    <th className="px-4 py-3">Shipping Method</th>
                    <th className="px-4 py-3">Cost (AUD)</th>
                    <th className="px-4 py-3">Estimated Transit Window</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-gray-600">
                  <tr>
                    <td className="px-4 py-3 font-semibold text-slate-800">Local Shipping (Australia)</td>
                    <td className="px-4 py-3 text-banknote-green font-bold">$10.00</td>
                    <td className="px-4 py-3">3 - 5 business days</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-semibold text-slate-800">Normal Shipping</td>
                    <td className="px-4 py-3 text-banknote-green font-bold">$20.00</td>
                    <td className="px-4 py-3 font-semibold text-slate-800">1 - 2 business days (Metro Priority Courier)</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-semibold text-slate-800">Same Day Shipping</td>
                    <td className="px-4 py-3 text-banknote-green font-bold">$40.00</td>
                    <td className="px-4 py-3 text-banknote-green font-semibold">Same Day Dispatch & Urgent Priority Routing</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-semibold text-slate-800">International Shipping</td>
                    <td className="px-4 py-3 text-banknote-green font-bold">$50.00</td>
                    <td className="px-4 py-3">4 - 8 business days (Global Registered Air Post)</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-xs text-gray-500 italic">
              * Note: Delivery windows are estimates. Deliveries can occasionally face minor shipping line delays due to weather patterns, carrier capacity bottlenecks, or custom checks.
            </p>
          </div>

          {/* Section 2: Custom Declarations */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-lg bg-banknote-green-light flex items-center justify-center text-banknote-green shrink-0">
                <Globe className="w-4 h-4" />
              </div>
              <h2 className="text-2xl font-bold text-banknote-navy">2. Custom Clearances & Cross-Border Delivery</h2>
            </div>
            <p className="mb-4 text-justify">
              We ship hundreds of movie prop orders across international custom checkpoints daily. Our logs are manifested accurately as <strong>&quot;Paper Film Props&quot;</strong>, <strong>&quot;novelty training paper aids&quot;</strong>, or <strong>&quot;Theatrical display assets&quot;</strong>, ensuring seamless clearances through customs gates at ports of entry.
            </p>
            <p className="text-sm text-gray-650">
              International customers should bear in mind that any local import taxes or administrative custom processing charges assessed inside the buyer&apos;s destination country are the sole responsibility of the purchaser.
            </p>
          </div>

          {/* Section 3: Tracking & Verification */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-lg bg-banknote-green-light flex items-center justify-center text-banknote-green shrink-0">
                <Box className="w-4 h-4" />
              </div>
              <h2 className="text-2xl font-bold text-banknote-navy">3. Real-Time Routing Verification</h2>
            </div>
            <p className="mb-4">
              Once your prop cash bundle leaves our warehouse locations:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-sm text-gray-600 mb-4">
              <li>An automated email dispatch notification will be triggered, carrying your unique <strong>carrier tracking link</strong>.</li>
              <li>For custom requests prepared on WhatsApp, our agents will snap a photo of the packed bundle and the physical shipping labels before final courier pick-up to verify exact packing under client scrutiny.</li>
              <li>You may track the package in real-time until it is securely dropped at your designated front door or studio loading dock.</li>
            </ul>
          </div>

          {/* Section 4: Refund/Lost Package Policy */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-lg bg-banknote-green-light flex items-center justify-center text-banknote-green shrink-0">
                <RotateCcw className="w-4 h-4" />
              </div>
              <h2 className="text-2xl font-bold text-banknote-navy">4. Delivery Guarantee & Reshipping Protocol</h2>
            </div>
            <p className="mb-4">
              While we maintain an elite dispatch success rate exceeding 99.4%, standard shipping channels are sometimes unpredictable. In the rare event of:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-sm text-gray-600 mb-4">
              <li><strong>Lost Shipments:</strong> If a package is declared officially lost in carrier systems, we will initiate a <strong>100% Free Replacements Shipments</strong> of your identical prop catalog order.</li>
              <li><strong>Customs Seizures:</strong> For custom requests stuck inside highly severe border clearance queues, our logistics team will engage customs officials to release the educational media props, or reship a complementary bundle via secondary corridors.</li>
              <li><strong>Inaccurate Address Failures:</strong> Packages returned to our sorting centers due to incorrect delivery addresses submitted by the user will incur nominal reshipping courier fees.</li>
            </ul>
          </div>

        </div>

        {/* Footer Contact Support Box */}
        <div className="bg-slate-100 rounded-2xl p-6 text-center border border-slate-200 mt-8">
          <p className="text-sm text-gray-600 flex items-center justify-center gap-2 mb-2">
            <MessageSquare className="w-4 h-4 text-banknote-green" />
            <strong>Need instant tracking reviews or urgent overnight filmmaker delivery scheduling?</strong>
          </p>
          <p className="text-sm font-semibold text-banknote-navy">
            Chat with us on WhatsApp <span className="text-banknote-green">+61468187831</span> or contact tracking: <span className="text-banknote-green">info@australianpropsmoney.com</span>
          </p>
        </div>

      </div>
    </div>
  );
}
