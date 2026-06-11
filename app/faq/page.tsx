import Link from 'next/link';

export const metadata = {
  title: 'Frequently Asked Questions',
  description: 'Common questions about Australian Prop Money, legality, shipping, and production uses.',
};

export default function FAQPage() {
  const faqs = [
    {
      question: "Is your prop money legal?",
      answer: "Yes, our prop money is entirely legal when used for its intended purpose: film, television, theatre, photography, and training. It is designed to comply with Australian regulations. All notes contain explicit, non-removable text stating 'FOR MOTION PICTURE USE ONLY' and differ in key security aspects from real currency. Attempting to use prop money as actual currency is a federal crime."
    },
    {
      question: "How fast is shipping?",
      answer: "We offer several choices tailored to your production's urgency: Local Australia Shipping ($10.00), Normal Priority Courier ($20.00), Same Day Dispatch & Urgency routing ($40.00), and Global International Shipping ($50.00). Orders on Same Day dispatch are packed first and processed for priority transit windows."
    },
    {
      question: "Do the notes look identical on camera?",
      answer: "Our notes are specifically engineered for the camera. From a few feet away, or under cinematic lighting, they appear extremely authentic. The level of detail is sufficient for standard framing, though extreme macro close-ups will naturally reveal the legal disclaimers we must include."
    },
    {
      question: "Can I get a custom design printed?",
      answer: "Yes! We specialize in custom fictional currencies for sci-fi, fantasy, or stylized productions. If your production requires completely custom legal tender substitutes to avoid entirely any legal gray areas, please contact our custom design department."
    },
    {
      question: "Do they feel like real money?",
      answer: "No. Our props are printed on specialized paper stock that resembles the tactile qualities required for smooth sorting and handling on set, but they do NOT use the proprietary polymer blends used in genuine Australian currency."
    },
    {
      question: "Do you sell internationally?",
      answer: "Yes! We now ship worldwide using our international courier network. International shipping is configured at an automated flat rate of $50.00 AUD. All orders are packed inside double-vacuum discrete stealth packaging to guarantee secure custom clearance."
    }
  ];

  return (
    <div className="bg-white min-h-screen py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <h1 className="text-4xl font-black text-banknote-navy mb-4">Frequently Asked Questions</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Everything you need to know about purchasing, legally using, and caring for your production prop currency.
          </p>
        </div>

        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-brand-gray p-6 rounded-lg border border-gray-200">
              <h2 className="text-xl font-bold text-banknote-navy mb-3">{faq.question}</h2>
              <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
            </div>
          ))}
        </div>
        
        <div className="mt-16 bg-banknote-navy text-white text-center p-8 rounded-xl">
          <h2 className="text-2xl font-bold mb-4">Still have questions?</h2>
          <p className="mb-6 text-gray-300">Our production support team is ready to assist you with specific requirements.</p>
          <Link href="/contact" className="inline-flex justify-center items-center px-6 py-3 bg-banknote-green text-white rounded-md font-semibold hover:bg-banknote-green-light hover:text-banknote-navy transition-colors">
            Contact Support
          </Link>
        </div>

      </div>
    </div>
  );
}
