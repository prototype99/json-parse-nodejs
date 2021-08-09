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
    //open block
    output +=  "<div class=\"post\"><h2>";
    //add title
    output +=  blogEntry.title + "</h2>";
    //open small
    output +=  "<small>";
    //convert date into something readable
    blogEntry.date = new Date(blogEntry.date).toString();
    //end small
    output +=  blogEntry.date + " | " + blogEntry.tags + "</small>";
    //open extract
    output +=  "<p>";
    //end extract
    output +=  blogEntry.content.substring(0, 250) + "..." + "</p>";
    //end block
    output +=  "</div>";
})
//end file
output +=  "</body></html>"
//open up stream
let stream = fs.createWriteStream("output.htm");
//actually write the file
stream.once('open', function(fd) {
    stream.end(output);
});
console.log(output);