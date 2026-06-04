import Link from 'next/link';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';

export const metadata = {
  title: 'Contact Us',
  description: 'Get in touch with Australian Prop Money for bulk production orders, custom requests, or general enquiries.',
};

export default function ContactPage() {
  return (
    <div className="bg-brand-gray min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-black text-banknote-navy mb-4">Contact Our Team</h1>
          <p className="text-lg text-gray-600">
            Need a custom order for a major production? Rush shipping required? Our team is standing by to assist with your creative requirements.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Contact Information */}
          <div className="lg:col-span-1 space-y-8">
            <div className="bg-white p-8 rounded-xl border border-gray-100 shadow-sm">
              <h2 className="text-2xl font-bold text-banknote-navy mb-6">Get in Touch</h2>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <Phone className="w-6 h-6 text-banknote-green shrink-0 mt-1" />
                  <div className="ml-4">
                    <h3 className="font-bold text-gray-900">WhatsApp</h3>
                    <p className="mt-1">
                      <a href="https://wa.me/447341056054" target="_blank" rel="noopener noreferrer" className="text-banknote-green font-semibold hover:underline">
                        +447341056054
                      </a>
                    </p>
                    <p className="text-xs text-gray-500 mt-1">Chat live is available for instant support</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Mail className="w-6 h-6 text-banknote-green shrink-0 mt-1" />
                  <div className="ml-4">
                    <h3 className="font-bold text-gray-900">Email</h3>
                    <p className="text-gray-600 mt-1">info@australianpropsmoney.com</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <MapPin className="w-6 h-6 text-banknote-green shrink-0 mt-1" />
                  <div className="ml-4">
                    <h3 className="font-bold text-gray-900">Head Office</h3>
                    <p className="text-gray-600 mt-1">123 Production Way<br/>Sydney, NSW 2000<br/>Australia</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-banknote-navy p-8 rounded-xl text-white">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Clock className="w-5 h-5 text-banknote-gold" />
                Urgent Production?
              </h2>
              <p className="text-sm text-gray-300 mb-4">
                We understand that shooting schedules change rapidly. If you require overnight delivery or same-day local courier service, please message us directly via WhatsApp or Email for priority support.
              </p>
              <a href="https://wa.me/447341056054" target="_blank" rel="noopener noreferrer" className="inline-block bg-banknote-gold text-banknote-navy px-4 py-2 rounded font-bold hover:bg-white transition-colors">Message on WhatsApp</a>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white p-8 md:p-10 rounded-xl border border-gray-100 shadow-sm">
              <h2 className="text-2xl font-bold text-banknote-navy mb-6">Send a Message</h2>
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                    <input type="text" id="firstName" className="w-full border border-gray-300 rounded-md py-3 px-4 focus:outline-none focus:ring-2 focus:ring-banknote-green focus:border-transparent" placeholder="John" />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                    <input type="text" id="lastName" className="w-full border border-gray-300 rounded-md py-3 px-4 focus:outline-none focus:ring-2 focus:ring-banknote-green focus:border-transparent" placeholder="Doe" />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                  <input type="email" id="email" className="w-full border border-gray-300 rounded-md py-3 px-4 focus:outline-none focus:ring-2 focus:ring-banknote-green focus:border-transparent" placeholder="john@productionco.com.au" />
                </div>

                <div>
                  <label htmlFor="topic" className="block text-sm font-medium text-gray-700 mb-1">Inquiry Type</label>
                  <select id="topic" className="w-full border border-gray-300 rounded-md py-3 px-4 focus:outline-none focus:ring-2 focus:ring-banknote-green focus:border-transparent">
                    <option>General Enquiry</option>
                    <option>Bulk/Wholesale Request</option>
                    <option>Custom Props Design</option>
                    <option>Shipping/Logistics</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                  <textarea id="message" rows={5} className="w-full border border-gray-300 rounded-md py-3 px-4 focus:outline-none focus:ring-2 focus:ring-banknote-green focus:border-transparent" placeholder="Tell us about your production needs..."></textarea>
                </div>

                <div className="pt-2">
                  <button type="button" className="w-full md:w-auto px-8 py-4 bg-banknote-green text-white rounded-md font-semibold text-lg hover:bg-banknote-green-dark transition-colors shadow-sm">
                    Send Message
                  </button>
                </div>
              </form>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
