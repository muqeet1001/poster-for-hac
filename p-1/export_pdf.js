const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
  const browser = await puppeteer.launch({
    executablePath: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
    headless: true
  });

  const page = await browser.newPage();

  await page.goto('file://' + __dirname + '/index.html', {
    waitUntil: 'networkidle0',
  });

  const width = 1920; 

  await page.setViewport({
    width: width,
    height: 3000,
  });

  // Calculate the actual content height, but we know the main is max-w-6xl.
  // The poster content is in <main>. We can get the bounding box of <main>.
  const mainHandle = await page.$('main');
  const boundingBox = await mainHandle.boundingBox();
  
  const pdfWidth = Math.ceil(boundingBox.width) + (boundingBox.x * 2); // adding margins
  const pdfHeight = Math.ceil(boundingBox.height) + (boundingBox.y * 2);

  await mainHandle.dispose();

  await page.setViewport({
    width: width,
    height: Math.ceil(pdfHeight),
    deviceScaleFactor: 2
  });
  
  console.log(`Generating PDF with dimensions: ${pdfWidth}x${pdfHeight}`);

  await page.pdf({
    path: path.join(__dirname, 'poster.pdf'),
    printBackground: true,
    width: `${pdfWidth}px`,
    height: `${pdfHeight}px`,
  });

  console.log('PDF exported successfully! Links should be clickable.');

  await browser.close();
})();
