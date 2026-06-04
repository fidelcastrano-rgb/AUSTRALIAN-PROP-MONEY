import Link from 'next/link';
import Image from 'next/image';
import { blogPosts } from '@/lib/blogData';
import { Calendar, Clock, User, ArrowRight } from 'lucide-react';

export const metadata = {
  title: 'Blog & Production Guides',
  description: 'In-depth industry guides, legal compliance updates, and cinematic lighting masterclasses for prop money and replica currency.',
};

export default function BlogListingPage() {
  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Editorial Header */}
      <div className="bg-banknote-navy text-white py-16 lg:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:16px_16px] opacity-10"></div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <span className="text-banknote-green text-xs font-extrabold tracking-widest uppercase bg-emerald-950/50 px-3 py-1.5 rounded-full border border-banknote-green/20">
            Education & Resources
          </span>
          <h1 className="text-4xl md:text-5xl font-heading font-black mt-4 mb-6 tracking-tight">
            The Prop Money Journal
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto font-medium leading-relaxed">
            Professional set design briefings, legal compliance breakdowns, and cinematic lighting secrets straight from our veteran consultants.
          </p>
        </div>
      </div>

      {/* Blog Cards Grid */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <div 
              key={post.slug}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col h-full group"
            >
              {/* Thumbnail Container */}
              <div className="relative h-52 w-full overflow-hidden bg-slate-100">
                <Image 
                  src={post.image} 
                  alt={post.title} 
                  fill 
                  className="object-cover group-hover:scale-105 transition-transform duration-500" 
                  referrerPolicy="no-referrer"
                />
                {/* Category Label */}
                <span className="absolute top-4 left-4 bg-banknote-navy/95 border border-slate-700 text-white text-[10px] uppercase font-extrabold tracking-widest px-2.5 py-1 rounded">
                  {post.category}
                </span>
              </div>

              {/* Card Body */}
              <div className="p-6 flex flex-col flex-1">
                {/* Meta details */}
                <div className="flex items-center gap-4 text-[11px] text-slate-400 font-bold mb-3 border-b border-slate-100 pb-3 uppercase tracking-wider">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-banknote-green" />
                    <span>{post.date}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>{post.readTime}</span>
                  </div>
                </div>

                {/* Title */}
                <Link href={`/blog/${post.slug}`} className="block">
                  <h2 className="text-lg font-bold font-heading text-banknote-navy leading-snug group-hover:text-banknote-green transition-colors line-clamp-2">
                    {post.title}
                  </h2>
                </Link>

                {/* Excerpt */}
                <p className="text-xs text-slate-500 mt-3 line-clamp-3 leading-relaxed flex-1">
                  {post.excerpt}
                </p>

                {/* Author Info */}
                <div className="flex items-center gap-2 mt-6 pt-4 border-t border-slate-100/85">
                  <div className="w-6 h-6 bg-slate-100 rounded-full flex items-center justify-center text-[10px] text-slate-500 font-extrabold border border-slate-200">
                    {post.author.charAt(0)}
                  </div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tight truncate max-w-[150px]">
                    By {post.author.split(',')[0]}
                  </span>
                </div>

                {/* Read Button */}
                <div className="mt-4 pt-2">
                  <Link 
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-1 bg-slate-50 hover:bg-banknote-green-light border border-slate-200 hover:border-banknote-green text-banknote-navy hover:text-banknote-green text-xs font-bold py-2 px-4 rounded-lg transition-all w-full justify-center group-hover:shadow-sm"
                  >
                    Read Premium Guide
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Compliance / Legal Prompt Banner on index */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="bg-[#1e293b]/95 border border-slate-800 text-slate-300 p-8 rounded-2xl shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-emerald-500/10 rounded-full blur-3xl"></div>
          <div className="space-y-2 relative z-10">
            <h3 className="text-white text-lg font-bold font-heading">Need custom dimensions or specific text overrides?</h3>
            <p className="text-xs text-slate-400 leading-relaxed max-w-xl">
              We work directly with major film production studios regularly. Contact our specialized compliance department to request bespoke design plates, single-sided layouts, or custom denomination configurations.
            </p>
          </div>
          <Link 
            href="/contact" 
            className="shrink-0 bg-banknote-green hover:bg-banknote-green-dark text-white font-bold text-sm px-6 py-3 rounded-lg shadow-md transition-colors relative z-10 w-full md:w-auto text-center"
          >
            CONTACT COMPLIANCE
          </Link>
        </div>
      </div>
    </div>
  );
}
