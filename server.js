'use strict';

var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');


// require and use "multer"...
var multer = require('multer');
var upload = multer();

var app = express();

app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
     res.sendFile(process.cwd() + '/views/index.html');
  });

app.get('/hello', function(req, res){
  res.json({greetings: "Hello, API"});
});

app.post("/api/fileanalyse", upload.single("file"), (req, res, next) => {
  next(res.json({
    name: req.file["originalname"],
    type: req.file["mimetype"],
    size: req.file["size"]
  }));
})

// If user goes direct to the API link
app.get("/api/fileanalyse", (req, res, next) => {
  next(res.redirect("/"));
})

app.listen(process.env.PORT || 3000, function () {
  console.log('Node.js listening ...');
});
