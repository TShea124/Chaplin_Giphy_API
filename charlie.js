// App Requirements
var request = require("request");
var ejs = require ("ejs");
var express = require("express");
var app = express();

app.set("view_engine", "ejs");

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: false}));

// Array Contains results from search
var gifs = [];

// Search Vaiables
var search, giphy;

// Render index page (search page)
app.get("/", function (req, res) {
	res.render("index.ejs");
});

// Uses info from Index.ejs to Search Giphy using an API
app.post("/snapshots", function (req, res) {
	// Input from Form
	search = req.body.search
	// API Search
	request("http://api.giphy.com/v1/gifs/search?q=" + search + "&api_key=dc6zaTOxFJmzC", function (err, response, body) {
		gifs = [];
		var results = JSON.parse(body);
		for (var i = 0; i < results.data.length; i++) {
		gifs.push(results.data[i].images.original.url);
		}
		res.redirect("/snapshots");
	});
});

// A Snapshots Page is Rendered to have all Gif's 
app.get("/snapshots", function(req, res){
	res.render("show.ejs", {gifs: gifs, search: search});
});
// Listening On Port 3000
app.listen(3000, function() {
	console.log("Listening on Port 3000");
});