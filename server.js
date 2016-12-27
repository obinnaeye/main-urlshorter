var express = require("express");
var urlcheck = require("./modules/urlcheck.js");
var urls = require("./collections/urls.js");
var shortid = require("shortid");
var helmet = require('helmet');
var app = express();

var url =process.env.MONGODB_URI;
//helmet is good header security
app.use(helmet());

app.use(express.static(__dirname + '/public'));

//Set the server homepage route
app.get("/", function(req, res){
    res.send("Ok");
});

//Set the /:url route
app.get("/:url(*)", function(req, res){
    
    var uri = req.params.url;
    var id = shortid.generate();
    
    if(urlcheck.respond(uri) === "url"){urls.new(uri, id, res)}
    else if(urlcheck.respond(uri) === "id"){urls.short(uri, res)}
    else if(urlcheck.respond(uri) === "notId"){urls.errorID(uri, res)}
    else{urls.errorURL(uri, res)}

});

app.listen(process.env.PORT, function(){
    console.log("Server Running at: ", process.env.PORT, url);
});