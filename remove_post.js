const fs = require('fs');
let data = fs.readFileSync('lib/blogData.ts', 'utf8');
const startStr = '{\n    title: "Legal Compliance and Reproductions: Sizing and Markings of Replica Banknotes",';
const startIdx = data.indexOf(startStr);
if (startIdx === -1) {
  console.log("Could not find start");
  process.exit(1);
}
const endString = 'the thrill of the story.`,\n  },';
const endIdx = data.indexOf(endString, startIdx) + endString.length;
if (endIdx < endString.length) {
  console.log("Could not find end");
  process.exit(1);
}
data = data.slice(0, startIdx) + data.slice(endIdx);
fs.writeFileSync('lib/blogData.ts', data);
console.log("Success");
