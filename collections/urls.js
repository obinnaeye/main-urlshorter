var mongodb = require("mongodb");
var MongoClient = mongodb.MongoClient;

var mlabURI =process.env.MONGODB_URI;
var host = "https://urlshorterking.herokuapp.com/";

var urls ={};

urls.new = function(uri, id, response){
    MongoClient.connect(mlabURI, function (err, db) {
        if(err) throw err;
        var collection = db.collection("urls");
        /****/
       collection.findOne({originalURL: uri},{_id:0, originalURL:1, shortURL:1}, function(err, doc){
                if(err) {response.send("An errow occured")}
                else if(doc){
                    response.send({
                        originalURL: host + doc.originalURL,
                        shortURL: doc.shortURL
                    });
                }else{
                    db.close()
                    MongoClient.connect(mlabURI, function (err, db1){
                        if(err)throw err;
                        db1.collection("urls").insert({_id: id, originalURL: uri, shortURL: host+id}, function(err, data){
                        if(err)throw err;
                        response.send({
                            originalURL: host+uri,
                            shortURL: host+id
                        });
                    });
                        
                    })
                    
                }
            });
        db.close()
    });
}

urls.short = function(uri, response){
    MongoClient.connect(mlabURI, function(err, db){
        if(err) throw err;
        var collection = db.collection("urls");
        collection.findOne({_id : uri}, function(err, doc){
            if (err) {throw err}
            else if (doc) {response.redirect( doc.originalURL);}
            else {response.send("Can not find document with the parameter " + uri + "in the database!")}
        });
        db.close();
    });
};

urls.errorURL = function(uri, response){
    response.send("The URL you entered is invalid. Ensure to use -https:// or http//- at the begining.");
};

urls.errorID = function(uri, response){
    response.send("Can not find shortened url with the parameter: " + uri + ".");
};

module.exports = urls;