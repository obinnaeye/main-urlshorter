var varlidUrl = require("valid-url");
var shortID = require("shortid");

var urlcheck ={};
urlcheck.respond = function(param){
    if(varlidUrl.isUri(param)){
        return "url";
    }
    else if(shortID.isValid(param)){
        return "id";
    }
    else if(param.match(/^[A-Za-z0-9]*$/)){
        return "notId";
    }
    else{
        return "notUrl";
    }
    
};


module.exports = urlcheck;