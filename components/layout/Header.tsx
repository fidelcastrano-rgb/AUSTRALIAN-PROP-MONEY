'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, Search, ShoppingCart, ChevronDown } from 'lucide-react';
import { useCart } from '@/components/shared/CartProvider';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { cartCount } = useCart();

  return (
    <header className="bg-white border-b border-gray-200 sticky top-[36px] sm:top-[40px] z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-banknote-green rounded flex items-center justify-center text-white">
                <span className="font-heading font-bold text-xl">$</span>
              </div>
              <div className="flex flex-col">
                <span className="font-heading text-xl font-black tracking-tight text-banknote-navy leading-none uppercase">Australian</span>
                <span className="font-heading text-sm font-semibold tracking-widest text-banknote-green uppercase leading-tight">Prop Money</span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8 text-sm font-bold uppercase tracking-wide text-slate-600">
            <Link href="/products" className="text-banknote-green border-b-2 border-banknote-green pb-1 hover:text-banknote-green transition-colors">
              Products
            </Link>
            <div className="relative group">
              <button className="flex items-center text-slate-600 hover:text-banknote-green uppercase tracking-wide font-bold transition-colors">
                Categories <ChevronDown className="ml-1 w-4 h-4" />
              </button>
              <div className="absolute left-0 mt-2 w-56 bg-white border border-gray-100 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="py-2">
                  <Link href="/category/australian-dollars" className="block px-4 py-2 text-sm text-gray-700 font-medium hover:bg-banknote-green-light hover:text-banknote-green">Australian Dollars</Link>
                  <Link href="/category/us-dollars" className="block px-4 py-2 text-sm text-gray-700 font-medium hover:bg-banknote-green-light hover:text-banknote-green">US Dollars</Link>
                  <Link href="/category/british-pounds" className="block px-4 py-2 text-sm text-gray-700 font-medium hover:bg-banknote-green-light hover:text-banknote-green">British Pounds</Link>
                  <Link href="/category/euro" className="block px-4 py-2 text-sm text-gray-700 font-medium hover:bg-banknote-green-light hover:text-banknote-green">Euro</Link>
                </div>
              </div>
            </div>
            <Link href="/about" className="text-slate-600 hover:text-banknote-green transition-colors">
              About
            </Link>
            <Link href="/faq" className="text-slate-600 hover:text-banknote-green transition-colors">
              FAQ
            </Link>
            <Link href="/contact" className="text-slate-600 hover:text-banknote-green transition-colors">
              Contact
            </Link>
          </nav>

          {/* Icons & CTA */}
          <div className="hidden md:flex flex-row items-center space-x-4">
            <button className="bg-slate-100 px-4 py-2 rounded-full text-xs font-bold text-slate-600 hover:bg-slate-200 transition-colors flex items-center gap-1" aria-label="Search">
              <Search className="w-4 h-4" /> SEARCH
            </button>
            <Link href="/cart" className="text-gray-500 hover:text-banknote-green transition-colors flex items-center" aria-label="Cart">
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && <span className="ml-1 text-xs font-bold text-white bg-banknote-navy px-1.5 py-0.5 rounded-full">{cartCount}</span>}
            </Link>
            <Link href="/products" className="bg-banknote-navy hover:bg-banknote-green text-white px-6 py-2.5 rounded font-bold text-sm transition-colors shadow-sm ml-2">
              REQUEST QUOTE
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center space-x-4">
            <Link href="/cart" className="text-gray-500 flex items-center relative">
              <ShoppingCart className="w-6 h-6" />
              {cartCount > 0 && <span className="absolute -top-1 -right-2 text-[10px] font-bold text-white bg-banknote-navy px-1.5 py-0.5 rounded-full">{cartCount}</span>}
            </Link>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-500 p-2"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 absolute w-full shadow-lg">
          <div className="px-4 pt-2 pb-6 space-y-1">
            <Link href="/" className="block px-3 py-3 text-base font-medium text-gray-900 border-b border-gray-50" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
            <Link href="/products" className="block px-3 py-3 text-base font-medium text-gray-900 border-b border-gray-50" onClick={() => setIsMobileMenuOpen(false)}>All Products</Link>
            <Link href="/category/australian-dollars" className="block px-3 py-3 text-base font-medium text-gray-600 border-b border-gray-50 pl-6" onClick={() => setIsMobileMenuOpen(false)}>Australian Dollars</Link>
            <Link href="/category/us-dollars" className="block px-3 py-3 text-base font-medium text-gray-600 border-b border-gray-50 pl-6" onClick={() => setIsMobileMenuOpen(false)}>US Dollars</Link>
            <Link href="/category/british-pounds" className="block px-3 py-3 text-base font-medium text-gray-600 border-b border-gray-50 pl-6" onClick={() => setIsMobileMenuOpen(false)}>British Pounds</Link>
            <Link href="/category/euro" className="block px-3 py-3 text-base font-medium text-gray-600 border-b border-gray-50 pl-6" onClick={() => setIsMobileMenuOpen(false)}>Euro</Link>
            <Link href="/about" className="block px-3 py-3 text-base font-medium text-gray-900 border-b border-gray-50" onClick={() => setIsMobileMenuOpen(false)}>About Us</Link>
            <Link href="/faq" className="block px-3 py-3 text-base font-medium text-gray-900 border-b border-gray-50" onClick={() => setIsMobileMenuOpen(false)}>FAQ</Link>
            <Link href="/contact" className="block px-3 py-3 text-base font-medium text-gray-900" onClick={() => setIsMobileMenuOpen(false)}>Contact</Link>
          </div>
        </div>
      )}
    </header>
  );
}
