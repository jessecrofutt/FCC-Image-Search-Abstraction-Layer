"use strict";

let dotenv = require('dotenv');   //for use of our environment letiables
dotenv.load();

const urlHandler = require('./urlHandler.js');

const express = require('express');
const app = express();

const port =  process.env.PORT;
// const port =  8888;

const url = process.env.MONGOLAB_URI;
// const url = `mongodb://localhost:27017/links`;
let mongo = require('mongodb').MongoClient;

let favicon = require('serve-favicon');
let path = require('path');

let sassMiddleware = require("node-sass-middleware");
app.use(sassMiddleware({
    src: __dirname + '/public',
    dest: '/tmp'
}));

app.use(favicon(path.join(__dirname , 'public', 'favicon.ico')));  //this eventally stopped my favicon woes
app.use(express.static('/tmp'));  //'/tmp' folder holds temporary sass file

app.get("/", function (request, response) {
    response.sendFile(__dirname + '/public/index.html');
});

app.get("/api/image_search/:search", function (request, response) {
    let searchTerms = request.params.search;
    let offset = request.query.offset || 1;
    let results = urlHandler(searchTerms, offset, function(err, obj) {
        if (err) console.log('Error getting refrence ' + err);
        if (obj !== undefined) {
            console.log('object is valid, returning it to the user');
            response.json(obj);
        } else {
            console.log('object is not valid, redirecting user to index');
            response.sendFile(__dirname + '/public/index.html');
        };
    });
});

app.get("/api/:history", function (request, response) {
    mongo.connect(url, function(err, db) {
        if (err) throw err;
        db.collection('searches').find({}, { date: 1, search: 1, _id: 0}).toArray(function(err, documents) {
            response.send(documents.reverse());
            db.close();
        });
    });
});

let listener = app.listen(port, function () {
    console.log('Your app is listening on port ' + listener.address().port);
});
