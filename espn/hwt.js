
const request = require("request");
const cheerio = require("cheerio");

const url = 'https://www.espncricinfo.com/series/ipl-2020-21-1210595/delhi-capitals-vs-mumbai-indians-final-1237181/full-scorecard';

request(url, cb);
function cb(error, response, html) {
    if (error) {
        console.error('error:', error); // Print the error if one occurred
    } else {
        extractHTML(html); // yaha pe extractor function call hua h
    }
};

function extractHTML(html) {

    let selectorTool = cheerio.load(html);
    let bowlerArr = selectorTool('.table.bowler');

    //let data=selectorTool(bowlerArr).text();

    //console.log(bowlerArr.length);

    let hwtplayer = "";
    let maxwicket = 0;

    for (let i = 0; i < bowlerArr.length; i++) {
        let bowlerTable = selectorTool(bowlerArr[i]).html();
        //console.log(bowlerTable);
        let allbowlers = selectorTool(bowlerTable).find('tbody>tr');
        //console.log(allbowlers.length);
        for (let j = 0; j < allbowlers.length; j++) {
            let colOfEachPlayerArr = selectorTool(allbowlers[j]).find('td');
            if (colOfEachPlayerArr.length == 1) continue;
            let playerName = selectorTool(colOfEachPlayerArr[0]).text();
            let wickets = selectorTool(colOfEachPlayerArr[4]).text();
            //console.log(playerName);
            //console.log(wickets);
            if (wickets > maxwicket) {
                maxwicket = wickets;
                hwtplayer = playerName;
            }

        }


    }

    console.log('highets wicket taking player  '+hwtplayer);
    console.log('Max number of wickets  '+maxwicket);

}