const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');

async function scrape() {
    console.log('Fetching reelbills.com...');
    const res = await axios.get('https://reelbills.com');
    const $ = cheerio.load(res.data);
    const pages = [];
    
    // Attempt to extract next js structured data
    let nextData = null;
    try {
        const scriptData = $('script#__NEXT_DATA__').html() || $('script[type="application/json"]').last().html();
        if (scriptData) nextData = JSON.parse(scriptData);
    } catch(e) {}
    
    // Find all links
    $('a').each((i, el) => {
        const h = $(el).attr('href');
        if (h && (h.includes('/product/') || h.includes('/products/'))) {
            pages.push(h);
        }
    });
    
    const uniquePages = [...new Set(pages)];
    console.log('Found product pages:', uniquePages.length);

    console.log('Finding all images on home page:');
    const images = [];
    $('img').each((i, el) => {
        let src = $(el).attr('src');
        if (src) {
           // check for srcset etc
           images.push(src);
        }
    });
    
    console.log(images.filter(img => !img.startsWith('data:') && !img.includes('.svg')));
    
    // Try to find the exact mappings.
    // We can also extract the raw text to see if there is any JSON-like data.
    const scripts = [];
    $('script').each((i, el) => {
        const html = $(el).html();
        if (html && html.includes('propcounterfeitnotes')) {
            scripts.push(html);
        }
    });
    
    fs.writeFileSync('reelbills_scripts.txt', scripts.join('\n\n---\n\n'));
    fs.writeFileSync('reelbills_images.json', JSON.stringify([...new Set(images)], null, 2));
    console.log('Saved data to reelbills_scripts.txt and reelbills_images.json');
}

scrape().catch(console.error);
