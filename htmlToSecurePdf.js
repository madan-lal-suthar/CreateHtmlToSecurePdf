var EventEmitter = require('events')
//evnet throw in node
var ee = new EventEmitter()
const fs = require('fs');
ee.on('message', async function(indexPage) {
    let  mailBody = '' 
     mailBody +=     '<!DOCTYPE html>'
     mailBody +=    '<html lang="en">'
     mailBody +=    '<head>'
     mailBody +=    '    <meta charset="UTF-8">'
     mailBody +=    '    <meta http-equiv="X-UA-Compatible" content="IE=edge">'
     mailBody +=    '    <meta name="viewport" content="width=device-width, initial-scale=1.0">'
     mailBody +=    '    <link rel="preconnect" href="https://fonts.googleapis.com">'
     mailBody +=    '    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>'
     mailBody +=    '    <link href="https://fonts.googleapis.com/css2?family=Kalam&family=Lato&display=swap" rel="stylesheet">'
     mailBody +=    '    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">'
     mailBody +=    '    <title>Document</title>'
     mailBody +=    '</head>'
     mailBody +=    '<body style = "background : #A07773">'
     mailBody +=    '    <center>'

     mailBody +=    '    </center>'
     mailBody +=    '</body>'
     mailBody +=    '</html>';
   

    let puppeteer = require("puppeteer");
    
    const browser = await puppeteer.launch({headless: 'new'});
    const page = await browser.newPage();
    
    await page.setViewport({width: 2080, height: 1024});

    await page.setContent(mailBody); //html
    await page.screenshot({path:`./exm${indexPage}.png`})
    await page.close();
    await browser.close();

    const PDFDocument = require('pdfkit');
    let options= {
        ownerPassword: "12345f6",
        userPassword : "123456"
    }
    const doc = new PDFDocument(options);

    doc.text('Hello, World!');      
    doc.image(`./exm${indexPage}.png`,0,1,{
        fit: [700, 100],
        width: "600",
        align: 'start',
        valign: 'start'
    });
    doc.pipe(fs.createWriteStream(`./output${indexPage}.pdf`));
    doc.end();
})
//this is a funtion
const enterElectricObj= async(req,res) => {
    ee.emit('message',req.body.indexPage)
    return;
})
