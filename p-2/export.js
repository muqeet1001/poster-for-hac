const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({
        headless: "new",
        defaultViewport: null,
    });

    const page = await browser.newPage();

    await page.goto('file://' + __dirname + '/index.html', {
        waitUntil: 'networkidle0',
    });

    // ✅ Safe 4K size (don’t go 8K directly)
    await page.setViewport({
        width: 1920,
        height: 1080,
        deviceScaleFactor: 2, // 🔥 makes it 4K quality
    });

    await page.screenshot({
        path: 'poster.png',
        fullPage: true, // ❗ important
    });

    await browser.close();
})();