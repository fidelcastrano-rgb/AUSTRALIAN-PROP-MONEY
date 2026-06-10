import { MetadataRoute } from 'next';
import { products, categories } from '@/lib/data';
import { blogPosts } from '@/lib/blogData';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://australianpropsmoney.com';

  const defaultPages = [
    '',
    '/about',
    '/products',
    '/faq',
    '/contact',
    '/blog',
    '/cart',
    '/checkout',
    '/privacy',
    '/shipping',
    '/terms',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  const productPages = products.map((product) => ({
    url: `${baseUrl}/products/${product.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  const categoryPages = categories.map((category) => ({
    url: `${baseUrl}/category/${category.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  const blogPages = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  const cities = ['sydney', 'melbourne', 'brisbane', 'gold-coast', 'perth', 'adelaide', 'canberra'];
  const locationPages = cities.map((city) => ({
    url: `${baseUrl}/locations/${city}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  return [...defaultPages, ...productPages, ...categoryPages, ...blogPages, ...locationPages];
}
