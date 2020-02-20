#!/usr/bin/env node

// scraper_v2.js --query="<query>" --output <file to save as> --timeout <timeout in seconds: default 1>
const puppeteer = require('puppeteer');
const argv = require('yargs').argv;

const query = argv.query;
const path_to_file = argv.output;
const timeout_s = (parseInt(argv.timeout) || 1);
const timeout_ms = timeout_s*1000;

const web_url = 'https://google.com';
const input_delay_ms = 50;

console.log('Querying TheGoogle');
console.log(`❓ Query: "${query}"`);
console.log(`🖼️ Output file: ${path_to_file}`);
console.log(`⏲️ Timeout: ${timeout_s} seconds`);

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setViewport({
    width: 1020,
    height: 880,
    deviceScaleFactor: 1,
  });
  await page.goto(web_url);
  await page.focus('input[name=q]');
  page.keyboard.type(query, {delay: input_delay_ms});
  await page.waitFor(timeout_ms);
  await page.screenshot({path: path_to_file, fullPage: true});
  console.log(`📸 Captured ${path_to_file}`);
  await browser.close();
})();
