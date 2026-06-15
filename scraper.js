const fs = require('fs');

// Usage: node scraper.js <URL_OR_FILE_PATH>
// Example: node scraper.js https://examplestore.com/products
// Example: node scraper.js source.html

async function scrape(source) {
    let html = '';

    if (source.startsWith('http://') || source.startsWith('https://')) {
        console.log(`Fetching URL: ${source}`);
        // Dynamic import to avoid needing it if fetching from local file
        const axios = require('axios');
        try {
            const response = await axios.get(source, {
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36'
                }
            });
            html = response.data;
        } catch (error) {
            console.error('Error fetching URL:', error.message);
            process.exit(1);
        }
    } else {
        console.log(`Reading local file: ${source}`);
        try {
            html = fs.readFileSync(source, 'utf-8');
        } catch (error) {
            console.error('Error reading file:', error.message);
            process.exit(1);
        }
    }

    const cheerio = require('cheerio');
    const $ = cheerio.load(html);
    const products = [];

    console.log('Analyzing HTML content for products...');

    // Attempt 1: Look for JSON-LD structured data (Common in Shopify, WooCommerce, etc.)
    $('script[type="application/ld+json"]').each((i, el) => {
        try {
            const parsed = JSON.parse($(el).html());
            const items = Array.isArray(parsed) ? parsed : [parsed];
            
            items.forEach(item => {
                // Sometimes it's wrapped in a Graph
                const entities = item['@graph'] || [item];
                entities.forEach(entity => {
                    if (entity['@type'] === 'Product') {
                        const product = {
                            title: entity.name,
                            description: entity.description || '',
                            image: entity.image ? (Array.isArray(entity.image) ? entity.image[0] : entity.image) : '',
                            price: entity.offers && entity.offers.price ? entity.offers.price : null,
                            variations: []
                        };
                        products.push(product);
                    }
                });
            });
        } catch (e) {
            // Ignore parse errors from malformed structured data
        }
    });

    // Attempt 2: HTML DOM Scraping if Structured Data isn't fruitful
    // Customize these selectors based on the target site (e.g., WordPress, Shopify)
    if (products.length === 0) {
        $('.type-product, .product, .product-item, .grid__item').each((i, el) => {
            const title = $(el).find('h1, h2, h3, .product-title, .title').first().text().trim();
            const price = $(el).find('.price, .amount, .money, [data-price]').first().text().trim();
            const description = $(el).find('.description, .product-details, .summary').text().trim();
            let image = $(el).find('img').first().attr('src') || $(el).find('img').first().attr('data-src');
            
            if (image && !image.startsWith('http')) {
                // Handle relative URLs
                if (image.startsWith('//')) image = 'https:' + image;
                else if (source.startsWith('http')) {
                    const urlObj = new URL(source);
                    image = urlObj.origin + (image.startsWith('/') ? '' : '/') + image;
                }
            }

            const variations = [];
            $(el).find('.variations select option, form[data-type="add-to-cart-form"] select option, .swatch-element, [data-variation]').each((j, varEl) => {
                const varText = $(varEl).text().trim();
                const varVal = $(varEl).attr('value');
                // Avoid empty or generic 'Choose an option'
                if (varVal && varVal !== '' && varVal.toLowerCase() !== 'choose an option') {
                    variations.push({
                        name: varText || varVal,
                        value: varVal,
                        price: $(varEl).attr('data-price') || null
                    });
                }
            });

            if (title) {
                products.push({
                    title,
                    price,
                    description,
                    image,
                    variations
                });
            }
        });
    }

    if (products.length > 0) {
        console.log(`Found ${products.length} products!`);
        fs.writeFileSync('scraped_products.json', JSON.stringify(products, null, 2));
        console.log('Results saved to scraped_products.json');
    } else {
        console.log('No products found using generic selectors. You may need to inspect the page source and adjust the Cheerio selectors (.product, .price, etc.) for this specific website.');
    }
}

const targetInfo = process.argv[2];
if (!targetInfo) {
    console.log('Usage: node scraper.js <URL_OR_FILE_PATH>');
    console.log('Note: Ensure you have axios and cheerio installed (npm i axios cheerio)');
    process.exit(1);
}

scrape(targetInfo).catch(err => {
    console.error('Unhandled scrap error:', err);
});
