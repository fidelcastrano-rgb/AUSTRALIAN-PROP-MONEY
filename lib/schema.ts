export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Australian Prop Money',
  url: 'https://australianpropmoney.com.au',
  logo: 'https://australianpropmoney.com.au/logo.png',
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+447341056054',
    contactType: 'customer service',
    areaServed: 'AU',
    availableLanguage: 'English'
  }
};

export const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'Australian Prop Money',
  image: 'https://australianpropmoney.com.au/storefront.jpg',
  '@id': 'https://australianpropmoney.com.au',
  url: 'https://australianpropmoney.com.au',
  telephone: '+447341056054',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '123 Production Way',
    addressLocality: 'Sydney',
    addressRegion: 'NSW',
    postalCode: '2000',
    addressCountry: 'AU'
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: -33.8688,
    longitude: 151.2093
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
  url: 'https://australianpropmoney.com.au/',
  potentialAction: {
    '@type': 'SearchAction',
    target: 'https://australianpropmoney.com.au/search?q={search_term_string}',
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
