import puppeteer from 'puppeteer';

(async () => {
  console.log("Launching browser...");
  let browser;
  try {
    browser = await puppeteer.launch();
    const page = await browser.newPage();
    
    page.on('console', msg => {
      console.log('BROWSER CONSOLE:', msg.text());
    });
    
    page.on('pageerror', err => {
      console.error('BROWSER PAGE ERROR:', err);
    });
    
    console.log("Navigating...");
    await page.goto('http://localhost:3000', { waitUntil: 'load', timeout: 10000 });
    
    console.log("Waiting 2 seconds...");
    await new Promise(r => setTimeout(r, 2000));
    
  } catch (e) {
    console.error("CAUGHT SCRIPT ERROR:", e);
  } finally {
    if (browser) await browser.close();
  }
})();
