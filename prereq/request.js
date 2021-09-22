 
const cheerio=require('cheerio');                   // ye extractor h jo humare matlab ki cheez nikal ke dega html se
const request = require('request');
request('https://www.worldometers.info/coronavirus/#', cb);

function cb(error, response, html) {        // agar error hogi to error me jaayega wrna html document html variable  me aajyeaga
    if(error){
        console.error('error:', error); // Print the error if one occurred
    }else{
        extractHTML(html); // yaha pe extractor function call hua h
    }
};
  

//hum ye function likh rhe h html se humare matlab ki cheez nikaalne ke liye
function extractHTML(html){
        let selectorTool= cheerio.load(html);       //selector tool ek variable h jisme html load hogyi h using cheerio.load method

        let statsArr=selectorTool('.maincounter-number'); 
        // is step me humne kya kiya h ->  jaise ki humne ek array banaya  aur uss array me wo saari information aajyegi
        // jispe bhi .maincounter class lagi hui h. to pehle check karlo jo data hume chaaiye uspe ye class lagi h ki nahi aur fir uske
        // baad ye jo selector tool h usse use karke manga lo
      
      
      //  console.log(statsArr.length);

    //ab teeno data ko meaningful way me kaise dekhe
    
     for(i of statsArr){
         let data= selectorTool(i).text();  // isme humne jo data pe iterate kiya usko wapis selector tool me wrap kiya kyuki 
         // zaroori h uske baad uspe text method lagaya kyuki hume text format me chaaiye

         console.log(data);

     }
       



}
