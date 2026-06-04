import Link from 'next/link';
import Image from 'next/image';
import { getBlogPostBySlug, blogPosts } from '@/lib/blogData';
import { notFound } from 'next/navigation';
import { Calendar, Clock, User, ArrowLeft, ChevronRight, Share2, Copy, Check, Sparkles } from 'lucide-react';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  
  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }
  
  return {
    title: `${post.title} | Prop Money Journal`,
    description: post.excerpt,
  };
}

// Inline formatting parser for markdown
function parseInlineMarkdown(text: string): string {
  return text
    .replace(/\*\*\*(.*?)\*\*\*/g, '<strong><em>$1</em></strong>')
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/`(.*?)`/g, '<code class="bg-slate-100 text-banknote-green px-1.5 py-0.5 rounded font-mono text-xs">$1</code>')
    .replace(/\\"/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&quot;/g, '"');
}

// Custom block level markdown to JSX parser
function renderMarkdownToJSX(content: string) {
  const blocks = content.split('\n\n');
  return blocks.map((block, i) => {
    const trimmed = block.trim();
    if (!trimmed) return null;

    // Headings
    if (trimmed.startsWith('### ')) {
      return (
        <h3 key={i} className="text-2xl md:text-3xl font-heading font-black text-banknote-navy mt-10 mb-4 border-l-4 border-banknote-green pl-4">
          {trimmed.slice(4)}
        </h3>
      );
    }
    if (trimmed.startsWith('#### ')) {
      return (
        <h4 key={i} className="text-lg md:text-xl font-heading font-bold text-banknote-green mt-8 mb-3">
          {trimmed.slice(5)}
        </h4>
      );
    }

    // Horizontal Rule
    if (trimmed === '---') {
      return <hr key={i} className="my-10 border-slate-200" />;
    }

    // Unordered list
    if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
      const items = trimmed.split('\n').map(line => line.replace(/^([-*]\s+)/, '').trim());
      return (
        <ul key={i} className="list-disc pl-6 my-6 space-y-3 text-slate-600 text-base md:text-lg leading-relaxed">
          {items.map((item, idx) => (
            <li key={idx} dangerouslySetInnerHTML={{ __html: parseInlineMarkdown(item) }} />
          ))}
        </ul>
      );
    }

    // Ordered list
    if (/^\d+\.\s+/.test(trimmed)) {
      const items = trimmed.split('\n').map(line => line.replace(/^\d+\.\s+/, '').trim());
      return (
        <ol key={i} className="list-decimal pl-6 my-6 space-y-3 text-slate-600 text-base md:text-lg leading-relaxed">
          {items.map((item, idx) => (
            <li key={idx} dangerouslySetInnerHTML={{ __html: parseInlineMarkdown(item) }} />
          ))}
        </ol>
      );
    }

    // Code and Visual Diagram blocks
    if (trimmed.startsWith('```') && trimmed.endsWith('```')) {
      const lines = trimmed.slice(3, -3).trim().split('\n');
      return (
        <div key={i} className="my-8 overflow-hidden rounded-xl border border-slate-750 shadow-md">
          <div className="bg-slate-950 px-4 py-2 flex items-center justify-between border-b border-slate-800">
            <span className="text-[10px] font-mono text-slate-500 uppercase font-black tracking-widest">ASCII SCHEMA RECORD</span>
            <div className="flex gap-1.5">
              <span className="w-2 h-2 rounded-full bg-red-500"></span>
              <span className="w-2 h-2 rounded-full bg-yellow-500"></span>
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            </div>
          </div>
          <pre className="bg-slate-900 text-emerald-400 p-5 font-mono text-xs overflow-x-auto">
            <code>{lines.join('\n')}</code>
          </pre>
        </div>
      );
    }

    // Structural diagrams
    if (trimmed.startsWith('+--') || trimmed.startsWith('|')) {
      return (
        <div key={i} className="my-8 overflow-hidden rounded-xl border border-slate-200 bg-slate-950 p-5 font-mono text-xs text-emerald-400 overflow-x-auto leading-relaxed shadow-sm">
          <pre>
            <code>{trimmed}</code>
          </pre>
        </div>
      );
    }

    // Paragraph
    return (
      <p 
        key={i} 
        className="text-slate-600 leading-relaxed text-base md:text-lg mb-6 font-normal"
        dangerouslySetInnerHTML={{ __html: parseInlineMarkdown(trimmed) }}
      />
    );
  });
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  
  if (!post) {
    notFound();
  }

  // Find remaining articles for the sidebar recommendation
  const otherPosts = blogPosts.filter(p => p.slug !== slug).slice(0, 2);

  return (
    <article className="bg-[#f8fafc] min-h-screen pb-20">
      {/* Editorial Header */}
      <div className="bg-banknote-navy text-white pt-10 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:20px_20px] opacity-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest mb-8">
            <Link href="/" className="hover:text-banknote-green transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link href="/blog" className="hover:text-banknote-green transition-colors">Blog</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-white truncate max-w-[200px] sm:max-w-none">{post.title}</span>
          </nav>
          
          {/* Meta Tag & Title */}
          <div className="max-w-4xl">
            <span className="bg-emerald-950 border border-banknote-green/35 text-banknote-green text-[10px] uppercase font-black tracking-widest px-3 py-1.5 rounded-full inline-block mb-4">
              {post.category}
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-heading font-black tracking-tight leading-tight mb-6">
              {post.title}
            </h1>
            
            {/* Author Profile */}
            <div className="flex flex-wrap items-center gap-6 text-sm text-slate-300">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center text-sm font-black text-banknote-green border border-slate-700">
                  {post.author.charAt(0)}
                </div>
                <div>
                  <p className="font-bold text-white">{post.author.split(',')[0]}</p>
                  <p className="text-xs text-slate-400 font-medium">{post.author.split(',')[1]?.trim()}</p>
                </div>
              </div>
              <div className="h-4 w-px bg-slate-700 hidden sm:block"></div>
              <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-wider text-slate-400">
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-banknote-green" />
                  <span>{post.date}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4" />
                  <span>{post.readTime}</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Main Column */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Article Editorial Column */}
          <div className="lg:col-span-8 flex flex-col">
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm p-6 sm:p-10">
              
              {/* Main Banner Image */}
              <div className="relative h-64 sm:h-[420px] w-full rounded-xl overflow-hidden mb-8 border border-slate-150">
                <Image 
                  src={post.image} 
                  alt={post.title} 
                  fill 
                  className="object-cover"
                  priority
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Rendered Body Content */}
              <div className="article-content prose prose-slate max-w-none">
                {renderMarkdownToJSX(post.content)}
              </div>

              {/* Back to summary */}
              <div className="mt-12 pt-8 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                <Link 
                  href="/blog" 
                  className="inline-flex items-center gap-2 font-bold text-slate-500 hover:text-banknote-green transition-colors text-sm uppercase tracking-wider"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to All Guides
                </Link>
                
                <div className="flex items-center gap-2 text-xs font-extrabold text-slate-400 uppercase tracking-widest bg-slate-50 border border-slate-200 rounded-lg py-1.5 px-3">
                  <Sparkles className="w-3.5 h-3.5 text-banknote-green" />
                  <span>Compliant Replica Art</span>
                </div>
              </div>

            </div>
          </div>

          {/* Sidebar / Recommended Content */}
          <div className="lg:col-span-4 space-y-8">
            
            {/* Interactive Industry Call-To-Action Box */}
            <div className="bg-gradient-to-br from-banknote-navy to-[#111e36] text-white p-8 rounded-2xl border border-slate-850 shadow-md relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-banknote-green/10 rounded-full blur-2xl"></div>
              <h2 className="text-xl font-heading font-black tracking-tight mb-4 text-white uppercase">
                Premium Props For Your Production
              </h2>
              <p className="text-xs text-slate-300 leading-relaxed mb-6 font-medium">
                Outfit your motion picture camera, photography set, or merchant training academies with Australia&apos;s leading high-reproduction counterfeit banknote models. Built directly for 8K visual specifications.
              </p>
              <div className="space-y-3">
                <Link 
                  href="/products" 
                  className="block text-center font-bold text-xs uppercase bg-banknote-green hover:bg-banknote-green-dark text-white py-3.5 px-4 rounded-lg transition-colors shadow-sm"
                >
                  Browse Prop Catalog
                </Link>
                <Link 
                  href="/faq" 
                  className="block text-center font-bold text-xs uppercase bg-transparent hover:bg-white/10 text-slate-304 border border-slate-700 hover:text-white py-3 px-4 rounded-lg transition-all"
                >
                  Read Legality FAQ
                </Link>
              </div>
            </div>

            {/* Read Next Sidebar List */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
              <h3 className="text-xs uppercase font-extrabold tracking-widest text-slate-400 border-b border-slate-100 pb-4 mb-4">
                Recommended Articles
              </h3>
              <div className="space-y-6">
                {otherPosts.map((other) => (
                  <div key={other.slug} className="group flex flex-col gap-2">
                    <div className="relative h-28 w-full rounded-lg overflow-hidden bg-slate-100 border border-slate-100">
                      <Image 
                        src={other.image} 
                        alt={other.title} 
                        fill 
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <Link href={`/blog/${other.slug}`} className="block">
                      <h4 className="text-sm font-extrabold text-banknote-navy leading-snug hover:text-banknote-green transition-colors line-clamp-2">
                        {other.title}
                      </h4>
                    </Link>
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wide">
                      {other.readTime}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Standard Warning / Disclaimers Sidebar Box */}
            <div className="bg-amber-50/50 border border-amber-200/60 p-6 rounded-2xl">
              <h3 className="text-xs uppercase font-extrabold tracking-widest text-amber-700 mb-2">
                Reproduction Warnings
              </h3>
              <p className="text-[11px] text-amber-800/85 leading-relaxed font-semibold">
                This blog article provides historical and general descriptive guidelines for prop currency art. All replica products offered by Australian Prop Money strictly incorporate the sizing offsets and legal notations required under commonwealth and international law to eliminate any misuse.
              </p>
            </div>

          </div>

        </div>
      </div>
    </article>
  );
}
