const cheerio = require('cheerio');                   // ye extractor h jo humare matlab ki cheez nikal ke dega html se
const request = require('request');
const chalk=require('chalk');
request('https://www.espncricinfo.com/series/ipl-2020-21-1210595/delhi-capitals-vs-mumbai-indians-final-1237181/full-scorecard', cb);

function cb(error, response, html) {        // agar error hogi to error me jaayega wrna html document html variable  me aajyeaga
    if (error) {
        console.error('error:', error); // Print the error if one occurred
    } else {
        extractHTML(html); // yaha pe extractor function call hua h
    }
};

//wahi basic extrator method jo hum likhte h 
function extractHTML(html) {
    let selectorTool = cheerio.load(html);              //selector tool me html load kkardega

    let allTables = selectorTool('.table tbody');
    //console.log(allTables.length);
    for (let i = 0; i < 4; i++) {
        let allRows = selectorTool(allTables[i]).find('tr');        // iss se hum saari rows extract kar skte h

        //console.log(allRows.length);

        //ab saari rows par iterate karte huye har player ke naam ke links nikaalenge
        for (let j of allRows) {
            //selector tool me wrap karna zaroori hota h kyuki usse nhi pata kaise read karna h

            let link = selectorTool(j).find('a').attr('href');      //attribute select karne ke liye, hume link chaaiye jo har row me h
            //https://www.espncricinfo.com/
            // console.log(link);

            if(link){
                let fullLink="https://www.espncricinfo.com/"+link;
                //console.log(fullLink);
               getBirthday(fullLink);
            }

        }

    }


}

function getBirthday(link){
request(link,cbf);
function cbf(error,response,html){
    if(error){
        console.log(error);
    }else{
        extractBday(html);
    }
}

}

function extractBday(html){
    let selectorTool=cheerio.load(html);
    
    let playerDetailsArr=selectorTool('.player-card-description.gray-900');
    //console.log(playerDetailsArr.length);
    let playerName=selectorTool(playerDetailsArr[0]).text();
    let date=selectorTool(playerDetailsArr[1]).text().split(",");
    // console.log(playerName);
    // console.log(date);
    let dob="";
    for(let i=0;i<2;i++){
        dob+= date[i];
    }
    
    console.log(chalk.blue('Name of the player: '+playerName));
    console.log(chalk.yellow('date of birth: '+dob));
    console.log('\n');


}