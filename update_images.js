const fs = require('fs');

const replacements = {
  'usd-100': 'https://propcounterfeitnotes.com/public/upload/product/buy-100-us-dollar-bills.224webp',
  'usd-50': 'https://propcounterfeitnotes.com/public/upload/product/buy-50-us-dollar-bills.225webp',
  'usd-20': 'https://propcounterfeitnotes.com/public/upload/product/buy-20-us-dollar-bills.73webp',
  'usd-10': 'https://propcounterfeitnotes.com/public/upload/product/buy-10-us-dollar-bills.85webp',
  'usd-5': 'https://propcounterfeitnotes.com/public/upload/product/buy-5-us-dollar-bills.223webp',
  
  'aud-100': 'https://superpropnotes.com/wp-content/uploads/2023/06/cd7072b9df060e9841a84c6ced00be46.jpg',
  'aud-50': 'https://superpropnotes.com/wp-content/uploads/2023/06/50-AD.jpg',
  'aud-20': 'https://superpropnotes.com/wp-content/uploads/2023/06/20-AD.jpg',
  'aud-10': 'https://superpropnotes.com/wp-content/uploads/2025/07/10-A.jpg',
  // maybe aud-5 is used? Give it the generic aud-50 one if needed, but reelbills doesn't have aud-5.
  
  'gbp-50': 'https://propcounterfeitnotes.com/public/upload/product/buy-ps50-gbp-bills.233webp',
  'gbp-20': 'https://propcounterfeitnotes.com/public/upload/product/buy-ps20-gbp-bills.234webp',
  'gbp-10': 'https://propcounterfeitnotes.com/public/upload/product/buy-ps10-gbp-bills.235webp',
  'gbp-5': 'https://propcounterfeitnotes.com/public/upload/product/buy-ps5-gbp-bills.236webp',

  'eur-500': 'https://propcounterfeitnotes.com/public/upload/product/buy-500-euro-bills.226webp',
  'eur-200': 'https://propcounterfeitnotes.com/public/upload/product/buy-eur200-euro-bills.227webp',
  'eur-100': 'https://propcounterfeitnotes.com/public/upload/product/buy-eur100-euro-bills.228webp',
  'eur-50': 'https://propcounterfeitnotes.com/public/upload/product/buy-eur50-euro-bills.229webp',
  'eur-20': 'https://propcounterfeitnotes.com/public/upload/product/buy-eur20-euro-bills.230webp',
  'eur-10': 'https://propcounterfeitnotes.com/public/upload/product/buy-eur10-euro-bills.231webp',
  'eur-5': 'https://propcounterfeitnotes.com/public/upload/product/buy-eur5-euro-bills.232webp'
};

let content = fs.readFileSync('lib/data.ts', 'utf8');

for (const [id, url] of Object.entries(replacements)) {
  const regex = new RegExp(`(id: '${id}',[\\s\\S]*?image: ')(.*?)(')`, "g");
  content = content.replace(regex, `$1${url}$3`);
}

// Since I didn't verify the CAD URLs from reelbills (they just linked back to australianpropsmoney), 
// I'll leave CAD alone or just point them to correct Wikipedia public images.
// Actually, earlier the images json showed: 'https://australianpropsmoney.com/images/canadian-dollars/cad-100.png', etc.
  
fs.writeFileSync('lib/data.ts', content);
