const request = require("request");
const cheerio = require("cheerio");
const { stat } = require("fs");

request("https://www.espncricinfo.com/series/ipl-2020-21-1210595/delhi-capitals-vs-mumbai-indians-final-1237181/live-cricket-score", cb);

function cb(error, response, html) {
    if (error) {
        console.error('error:', error); // Print the error if one occurred
    } else {
        extractHTML(html); // yaha pe extractor function call hua h
    }
};

function extractHTML(html) {

    let selectorTool = cheerio.load(html);
    let statsArr = selectorTool('.playerofthematch-player-detail');

    let data = selectorTool(statsArr[0]).text();
    console.log(data);


}
