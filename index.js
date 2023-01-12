const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
    const browser = await puppeteer.launch({
        args: [
            '--window-size=1920, 1080',
        ],
    });
   
    const page = await browser.newPage();

    //set the viewport in which the images will be viewed and saved.
    await page.setViewport({
        width: 1920,
        height: 1080,
      });


    page.on('response', async (response) => {

        //specify which file extension to look for
      const matches = /.*\.(jpg|png|gif|mp4|webp|webm|jpeg)$/.exec(response.url());

        //get the filename
      const matchName = {...matches};
      let fileName = matchName[0];
      let stringName = String(fileName);
      let convertedName = stringName.split('/').pop();
      console.log(matches, convertedName);

      //store images from webpages
      if (matches && (matches.length === 2)) {
        const buffer = await response.buffer();
        fs.writeFileSync(`images/${convertedName}`, buffer, 'base64');
      }
    });

        //desired page to scrape
    await page.goto('https://your-url-here.com');

    //to run, use "node index.js" in your terminal window

    await browser.close();
})();