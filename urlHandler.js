"use strict";

// const url = `mongodb://localhost:27017/links`;
const url = process.env.MONGOLAB_URI;
let mongo = require('mongodb').MongoClient;
        //google-images library used to access Google custom search engine (CSE)
const GoogleImages = require('google-images');
var cx = process.env.CSE_ID;
let apiKey = process.env.API_KEY;
const client = new GoogleImages(cx, apiKey);

module.exports = function(data, pagination, callback) {
    let motherObject = {};
    client.search(data, {page: pagination})
        .then(function(images){
            mongo.connect(url, function(err, db) {
                if (err) throw err;
                let searchDate = new Date();
                let collection = db.collection('searches');
                collection.insert({
                    date: searchDate,
                    search: data,
                    ordered: true
                });
                db.close();
            });
            for (let i = 0; i < images.length; i++) {
                motherObject[i] = {
                    "image-url": `${images[i].url}`,
                    "page-url": `${images[i].parentPage}`,
                    "alt-text": `${images[i].description}`
                };
            };
            callback(null, motherObject);
        });
};
