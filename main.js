//import libs
const fs = require("fs");
//read file
let input = require('./test.json');
//convert dte for sorting
input.forEach(blogEntry => {
    blogEntry.date = Date.parse(blogEntry.date);
})
//sort data
input.sort(function(a, b){
    return b.date - a.date;
});
//start file
let output = "<!DOCTYPE html><body><h1>The coolest blog to blog the blog in the history of blog</h1>";
//populate file
input.forEach(blogEntry => {
    ////add article page
    let loopPage = "<!DOCTYPE html><body><p><a href=\"index.htm\">back</a></p><h1>";
    //add title
    loopPage += blogEntry.title + "</h1>";
    //add content
    loopPage +=  "<p>" + blogEntry.content + "</p>";
    //end page
    loopPage +=  "</body></html>";
    //convert date into something readable
    blogEntry.date = new Date(blogEntry.date).toString().substring(0, 15);
    //create unique identifier
    let pageID = blogEntry.title + " " + blogEntry.date + ".htm";
    pageID = pageID.replace(/ /g,"-");
    //open up indexStream
    let loopStream = fs.createWriteStream(pageID);
    //actually write the file
    loopStream.once('open', function(fd) {
        loopStream.end(loopPage);
    });
    ////add index entry
    //open block
    output +=  "<div class=\"post\"><h2>";
    //add title
    output +=  blogEntry.title + "</h2>";
    //open small
    output +=  "<small>";
    //end small
    output +=  blogEntry.date + " | " + blogEntry.tags + "</small>";
    //add extract
    output +=  "<p>" + blogEntry.content.substring(0, 250) + "<a href=\"" + pageID + "\">...</a></p>";
    //end block
    output +=  "</div>";
})
//end file
output +=  "</body></html>";
//open up indexStream
let indexStream = fs.createWriteStream("index.htm");
//actually write the file
indexStream.once('open', function(fd) {
    indexStream.end(output);
});
console.log(output);