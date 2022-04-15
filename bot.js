const puppeteer = require('puppeteer-extra');
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
const fs = require('fs');
const schedule = require('node-schedule')
const {installMouseHelper} = require('./extras/install_mouse_helper');
require('dotenv').config()

puppeteer.use(StealthPlugin())
const runSnkrBot = () => {
  const html_path = 'htmls/bot_';
  const screenshot_path = 'screenshots/bot_';
  const SimpleNodeLogger = require('simple-node-logger'),
  opts = {
    logFilePath: 'logs/' + 'bot.log',
    timestampFormat:'YYYY-MM-DD HH:mm:ss.SSS'
  };
let html = '';
const email = process.env.EMAIL;
const pass = process.env.PASS;
const cv_code = process.env.CV_CODE
const size = 'US M 5.5 / W 7';
const date = new Date();
const url = 'https://www.nike.com/launch/t/air-force-1-billie-mushroom'
const debug = true;
const buy = false;

(async () => {
  const browser = await pippeteer.launch({
    ignoreHTTPSErrors: true,
    headless: false
  });
  const page = await browser.newPage();
  if(debug == true){
    await installMouseHelper(page);
    var dir = '.htmls';
    if (!fs.existsSync(dir)){
      fs.mkdirSync(dir);
    }
    dir = './screenshots';
    if (!fs.existsSync(dir)){
      fs.mkdirSync(dir);
    }
    dir = './logs';
			if (!fs.existsSync(dir)){
      fs.mkdirSync(dir);  
    }
    log = SimpleNodeLogger.createSimpleFileLogger( opts );
		log.setLevel('info');
  }
  await page.goto(url);
		page.waitForNavigation({ waitUntil: 'networkidle0' });
    if(debug == true){
      log.info('1. Page loaded');
      html = await page.content();
      fs.writeFileSync(html_path + "_1_loaded_" + Math.floor(new Date() / 1000) + ".html", html);
      page.screenshot({path: screenshot_path + "_1_loaded_" + Math.floor(new Date() / 1000) + '.png'});
    }
    await page.waitFor(500);
    await page.waitForSelector('button[data-qa="top-nav-join-or-login-button"]');
    console.log('Login button loaded')
    await page.evaluate(() =>
    document.querySelectorAll('button[data-qa="top-nav-join-or-login-button"]')[0].click())
    console.log('Testing login')
    await page.waitForSelector('.emailAddress');
    await page.waitFor(500);
    await page.focus('.emailAddress > input');
    await page.keyboard.type(email);
    await page.waitFor(200);
    await page.focus('.passwprd > input')
    await page.keyboard.type(pass);
    await page.waitFor(200);
    await page.evaluate(() =>
      document.querySelectorAll(".loginSubmit > input")[0].click()
    );
    if(debug == true){
      log.info('2. Logged in');
      html = await page.content();
      fs.writeFileSync(html_path + "_2_logged_in__" + Math.floor(new Date() / 1000) + ".html", html);
      page.screenshot({path: screenshot_path + "_2_logged_in_" + Math.floor(new Date() / 1000) + '.png'})
    }
    await page.waitFor(500);
    schedule.scheduleJob(date, async () => {
      console.log("testing schedule")
    })
    await page.waitForSelector('.size-grid-dropdown');
    await page.evaluate(() =>
    document.querySelectorAll(".size-grid-dropdown")[0].scrollIntoView()
    );
    if(debug == true){
      log.info('. Selectors appeared');
      html = await page.content();
      fs.writeFileSync(html_path + "_3_selectors_" + Math.floor(new Date() / 1000) + ".html", html);
      page.screenshot({path: screenshot_path + "_3_selectors_" + Math.floor(new Date() / 1000) + '.png'});
    }
    await page.waitFor(500);
    await page.evaluate(async(size) => {
      let sizes = Array.from(document.querySelectorAll(".size-grid-dropdown"));
      let sizeIndex = sizes
        .map((s, i) => (s.innerHTML === size ? i : false))
        .filter(Boolean)[0];
      return sizes[sizeIndex].click();
    }, size);
    if(debug == true){
      log.info('3. Found and clicked on size');
      html = await page.content();
      fs.writeFileSync(html_path + "_4_size_clicked__" + Math.floor(new Date() / 1000) + ".html", html);
      page.screenshot({path: screenshot_path + "_4_size_clicked_" + Math.floor(new Date() / 1000) + '.png'});
    }
    await page.waitFor(500);
    await page.evaluate(() =>
    document.querySelectorAll('button[data-qa="add-to-cart"]')[0].click()
    );
    if(debug == true){
      log.info('5. Clicked add button,');
      html = await page.content();
      fs.writeFileSync(html_path + "_6_clicked_add_button__" + Math.floor(new Date() / 1000) + ".html", html);
      page.screenshot({path: screenshot_path + "_6_clicked_add_button_" + Math.floor(new Date() / 1000) + ',png'});
    }
    await page.waitFor(500);
    await page.waitForSelector('.credit-card-iframe');
    await page.waitForSelector('.credit-card-iframe');
    await page.evaluate(() =>
    document.querySelectorAll(".credit-card-iframe")[0].scrollIntoView()
    );
    await page.waitFor(200);
    const target_frame = page.frames().find(frame => frame.url().includes('paymentcc.nike.com'));
    await target_frame.evaluate(
      () => (document.getElementById("cvNumber").focus())
    );
    await target_frame.waitFor(1000);
    await page.keyboard.type(cv_code, {delay: 10});
    if(debug == true){
      log.info('7. Entered CV');
      html = await page.content();
      fs.writeFileSync(html_path + "_7_entered_cv__" + Math.floor(new Date() / 1000) + ".html", html);
      page.screenshot({path: screenshot_path + "_7_entered_cv_" + Math.floor(new Date() / 1000) + '.png'});
    }
    await page.waitFor(500);
    await page.waitForSelector('.save-button');
    const buttons = await page.$$('.save-button');
    if(debug == true){
      log.info('8. Clicked Save & Continue');
      html = await page.content();
      fs.writeFileSync(html_path + "_8_save_continue__" + Math.floor(new Date() / 1000) + ".html", html);
      page.screenshot({path: screenshot_path + "_8_save_continue_" + Math.floor(new Date() / 1000) + '.png'});
    }
    await page.waitFor(500);
    if(buy == true){
      await buttons[2].click();
      if(debug == true){
        log.info('9. Submitted Order');
        html = await page.content();
        fs.writeFileSync(html_path + "_9_submitted_order__" + Math.floor(new Date() / 1000) + ".html", html);
        age.screenshot({path: screenshot_path + "_9_submitted_order_" + Math.floor(new Date() / 1000) + '.png'});
      }  
     await page.waitFor(500); 
     await browser.close();
    }
})();
}
module.export = runSnkrBot