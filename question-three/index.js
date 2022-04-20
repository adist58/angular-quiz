const puppeteer = require("puppeteer");

async function scrape() {
  const browser = await puppeteer.launch({});
  const page = await browser.newPage();
  await page.goto("https://codequiz.azurewebsites.net/");
  var btn = await page.waitFor("body > input[type=button]");
  await page.evaluate((element) => element.click(), btn);
  var tr = await page.waitFor("body > table > tbody > tr");
  var result = await page.evaluate(() => {
    const rows = document.querySelectorAll("body > table > tbody > tr");
    return Array.from(rows, (row) => {
      const columns = row.querySelectorAll("td");
      return Array.from(columns, (column) => column.innerText);
    });
  });
  result.shift();
  browser.close();
  const myArgs = process.argv.slice(2);
  textResult = "not found";
  for (let i = 0; i < result.length; i++) {
    if (result[i][0].trim() === myArgs[0].trim()) {
      textResult = result[i][1];
      break;
    }
  }
  console.log(textResult);
}
scrape();
