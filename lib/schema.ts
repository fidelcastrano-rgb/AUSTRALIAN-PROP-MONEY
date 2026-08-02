export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Australian Prop Money',
  url: 'https://australianpropsmoney.com',
  logo: 'https://australianpropsmoney.com/logo.png',
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+61468187831',
    contactType: 'customer service',
    areaServed: 'AU',
    availableLanguage: 'English'
  }
};

export const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'Australian Prop Money',
  image: 'https://australianpropsmoney.com/storefront.jpg',
  '@id': 'https://australianpropsmoney.com',
  url: 'https://australianpropsmoney.com',
  telephone: '+61468187831',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Sydney',
    addressRegion: 'NSW',
    postalCode: '2000',
    addressCountry: 'AU'
  },
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: [
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday'
    ],
    opens: '09:00',
    closes: '17:00'
  }
};

export const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Australian Prop Money',
  url: 'https://australianpropsmoney.com/',
  potentialAction: {
    '@type': 'SearchAction',
    target: 'https://australianpropsmoney.com/search?q={search_term_string}',
    'query-input': 'required name=search_term_string'
  }
};

export function generateProductSchema(product: {
  name: string,
  description: string,
  image: string,
  price: string,
  url: string
}) {
  return {
    '@context': 'https://schema.org/',
    '@type': 'Product',
    name: product.name,
    image: product.image,
    description: product.description,
    sku: `APM-${product.name.replace(/\s+/g, '-').toUpperCase()}`,
    offers: {
      '@type': 'Offer',
      url: product.url,
      priceCurrency: 'AUD',
      price: product.price,
      itemCondition: 'https://schema.org/NewCondition',
      availability: 'https://schema.org/InStock',
      seller: {
        '@type': 'Organization',
        name: 'Australian Prop Money'
      }
    }
  };
}
