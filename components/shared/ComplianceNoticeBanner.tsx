import Link from 'next/link';

export default function ComplianceNoticeBanner() {
  return (
    <div className="bg-banknote-navy text-white text-[10px] sm:text-[11px] font-bold uppercase tracking-widest text-center py-3 px-4 border-b-2 border-slate-800 sticky top-0 z-50">
      <p className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-3">
        <span className="bg-red-600 text-white px-2 py-1 rounded inline-block rotate-[-1deg]">LEGAL COMPLIANCE NOTICE</span> 
        <span className="leading-tight">This product is for film, television & educational purposes only. Not legal tender.</span>
        <Link href="/compliance" className="text-banknote-gold border-b border-banknote-gold hover:text-white hover:border-white transition-colors ml-2 pb-0.5">Learn More</Link>
      </p>
    </div>
  );
}
