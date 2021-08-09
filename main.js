//import libs
const fs = require("fs");
//read file
let input = require('./test.json');
//open up stream
let stream = fs.createWriteStream("output.htm");
//start file
let output = "<!DOCTYPE html><body><h1>The coolest blog to blog the blog in the history of blog</h1>";
//populate file
input.forEach(blogEntry => {
    //open block
    output +=  "<div class=\"post\"><h2>";
    //add title
    output +=  blogEntry.title + "</h2>";
    //open small
    output +=  "<small>";
    //end small
    output +=  blogEntry.date + " | " + blogEntry.tags + "</small>";
    //open extract
    output +=  "<p>";
    //end extract
    output +=  blogEntry.content + "</p>";
    //end block
    output +=  "</div>";
})
//end file
output +=  "</body></html>"
stream.once('open', function(fd) {
    stream.end(output);
});
console.log(output);