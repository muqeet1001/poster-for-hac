 const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    executablePath: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
    headless: true
  });

  const page = await browser.newPage();

  await page.goto('file://' + __dirname + '/index.html', {
    waitUntil: 'networkidle0',
  });

  await page.setViewport({
    width: 3840,
    height: 5000,
    deviceScaleFactor: 3
  });

  await page.screenshot({
    path: 'final.png',
    fullPage: true
  });

  await browser.close();
})();