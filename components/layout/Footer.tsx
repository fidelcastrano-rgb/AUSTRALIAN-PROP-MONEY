import Link from 'next/link';
import Image from 'next/image';
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';
import LogoImage from '../../public/Australianpropmoney1.png';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-100 border-t border-slate-200 text-slate-600 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          {/* Brand Info */}
          <div className="space-y-6">
            <Link href="/" className="inline-block">
              <Image 
                src={LogoImage} 
                alt="Australian Prop Money Logo" 
                className="h-10 w-auto object-contain" 
                style={{ maxHeight: '40px', width: 'auto' }}
                referrerPolicy="no-referrer"
              />
            </Link>
            <p className="text-sm leading-relaxed">
              Premium Australian-style prop notes designed exclusively for film production, photography, theatre, training simulations and creative projects.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-banknote-gold transition-colors" aria-label="Facebook"><Facebook className="w-5 h-5" /></a>
              <a href="#" className="hover:text-banknote-gold transition-colors" aria-label="Instagram"><Instagram className="w-5 h-5" /></a>
              <a href="#" className="hover:text-banknote-gold transition-colors" aria-label="Twitter"><Twitter className="w-5 h-5" /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-banknote-navy font-heading font-bold text-lg mb-6 uppercase tracking-wide">Quick Links</h3>
            <ul className="space-y-3">
              <li><Link href="/products" className="hover:text-banknote-green transition-colors text-sm font-semibold">Shop All Products</Link></li>
              <li><Link href="/about" className="hover:text-banknote-green transition-colors text-sm font-semibold">About Us</Link></li>
              <li><Link href="/blog" className="hover:text-banknote-green transition-colors text-sm font-semibold">Production Resources</Link></li>
              <li><Link href="/contact" className="hover:text-banknote-green transition-colors text-sm font-semibold">Contact Us</Link></li>
              <li><Link href="/faq" className="hover:text-banknote-green transition-colors text-sm font-semibold">FAQs</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-banknote-navy font-heading font-bold text-lg mb-6 uppercase tracking-wide">Categories</h3>
            <ul className="space-y-3">
              <li><Link href="/category/australian-dollars" className="hover:text-banknote-green transition-colors text-sm font-semibold">Australian Dollars</Link></li>
              <li><Link href="/category/us-dollars" className="hover:text-banknote-green transition-colors text-sm font-semibold">US Dollars</Link></li>
              <li><Link href="/category/british-pounds" className="hover:text-banknote-green transition-colors text-sm font-semibold">British Pounds</Link></li>
              <li><Link href="/category/euro" className="hover:text-banknote-green transition-colors text-sm font-semibold">Euro</Link></li>
              <li><Link href="/category/canadian-dollars" className="hover:text-banknote-green transition-colors text-sm font-semibold">Canadian Dollars</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-banknote-navy font-heading font-bold text-lg mb-6 uppercase tracking-wide">Contact & Locations</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="w-5 h-5 mr-3 text-banknote-gold shrink-0 mt-0.5" />
                <span className="text-sm">123 Production Way<br/>Sydney, NSW 2000<br/>Australia</span>
              </li>
              <li className="flex items-center">
                <Phone className="w-5 h-5 mr-3 text-banknote-gold shrink-0" />
                <a href="https://wa.me/447341056054" target="_blank" rel="noopener noreferrer" className="text-sm hover:text-banknote-green transition-colors">
                  WhatsApp: +447341056054
                </a>
              </li>
              <li className="flex items-center">
                <Mail className="w-5 h-5 mr-3 text-banknote-gold shrink-0" />
                <span className="text-sm">info@australianpropsmoney.com</span>
              </li>
            </ul>
            <div className="mt-6 flex gap-2 flex-wrap">
              <Link href="/locations/sydney" className="text-xs border border-slate-300 rounded px-2 py-1 hover:border-banknote-green hover:text-banknote-green transition-colors font-bold">Sydney</Link>
              <Link href="/locations/melbourne" className="text-xs border border-slate-300 rounded px-2 py-1 hover:border-banknote-green hover:text-banknote-green transition-colors font-bold">Melbourne</Link>
              <Link href="/locations/brisbane" className="text-xs border border-slate-300 rounded px-2 py-1 hover:border-banknote-green hover:text-banknote-green transition-colors font-bold">Brisbane</Link>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center mb-6">
            <div className="flex space-x-6 text-xs text-slate-500 font-bold uppercase tracking-widest">
              <Link href="/privacy" className="hover:text-banknote-green transition-colors">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-banknote-green transition-colors">Terms of Service</Link>
              <Link href="/shipping" className="hover:text-banknote-green transition-colors">Shipping Policy</Link>
              <Link href="/compliance" className="bg-red-600 text-white px-2 py-1 rounded rotate-[-2deg] hover:rotate-0 transition-transform">Compliance</Link>
            </div>
            <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mt-4 md:mt-0">&copy; {currentYear} Prop Counterfeit Notes. All rights reserved.</p>
          </div>
          <div className="text-xs text-slate-500 text-center max-w-4xl mx-auto leading-relaxed border-t border-slate-200 pt-6">
            <strong>Disclaimer:</strong> This website and all products are intended solely for legitimate motion picture, television, educational, and novelty purposes. All purchasers agree to use these props in compliance with applicable laws and regulations.
          </div>
        </div>
      </div>
      
      {/* WhatsApp Floating Button */}
      <a 
        href="https://wa.me/447341056054" 
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 bg-green-500 text-white p-4 rounded-full shadow-2xl hover:bg-green-600 transition-colors z-50 flex items-center justify-center hover:scale-110 duration-300"
        aria-label="Contact us on WhatsApp"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
        </svg>
      </a>
    </footer>
  );
}
