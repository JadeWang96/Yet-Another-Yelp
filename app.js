var express = require("express");
var app = express();
var request = require("request");
const PORT = 3000;
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");
var seedDB = require("./seeds");
// ==============================================================================================
seedDB();
mongoose.connect("mongodb://172.17.0.3:27017", { useNewUrlParser: true, useUnifiedTopology: true });

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

// ==============================================================================================
// Campgrounds Routes
// Landing page
app.get("/", function (req, res) {
    res.render("landing");
});

// INDEX
app.get("/campgrounds", function (req, res) {
    Campground.find({}, function (err, campgrounds) {
        if (err) {
            console.log(err);
        } else {
            res.render("campgrounds/index", { campgrounds: campgrounds });
        }
    });
});

// CREATE
app.post("/campgrounds", function (req, res) {
    // get the data from form and add to campgrounds
    var name = req.body.name;
    var image = req.body.image;
    var description = req.body.description;
    var newCampGround = { name: name, image: image, description: description };
    Campground.create(newCampGround, function (err, newlyCreated) {
        if (err) {
            console.log(err);
        } else {
            // redirect to the campgrounds page
            res.redirect("/campgrounds");
        }
    });

});

// NEW
app.get("/campgrounds/new", function (req, res) {
    res.render("campgrounds/new");
});

// SHOW
app.get("/campgrounds/:id", function (req, res) {
    Campground.findById(req.params.id).populate("comments").exec(function (err, foundCampground) {
        if (err) {
            console.log(err);
        } else {
            res.render("campgrounds/show", { campground: foundCampground });
        }
    });
});

// ==============================================================================================
// Comment Routes
// New 
app.get("/campgrounds/:id/comments/new", function(req, res) {
    Campground.findById(req.params.id, function(err, campground) {
        if (err) {
            console.log(err);
        } else {
            res.render("comments/new", {campground: campground});
        }
    });
});

// CREATE
app.post("/campgrounds/:id/comments", function(req, res) {
    Campground.findById(req.params.id, function(err, campground) {
        if (err) {
            console.log(err);
            res.redirect("/campgrounds");
        } else {
            Comment.create(req.body.comment, function(err, comment) {
                if (err) {
                    console.log(err);
                } else {
                    campground.comments.push(comment);
                    campground.save();
                    res.redirect("/campgrounds/" + campground._id);
                }
            });
        }
    });
});

// ==============================================================================================
app.listen(PORT, process.env.IP, function () {
    console.log("YelpCamp Server has started!");
});
// ==============================================================================================
// MongoDB
// docker run -d -p 27017:27017 -v /home/jade/Documents/Project/Yet-Another-Yelp/data:/data/db --name mongoDB mongo:latest
// docker exec -it mongoDB bash
// mongo
// Using mongoDB directly
// const MongoClient = require('mongodb').MongoClient;
// const assert = require('assert');

// // Connection URL
// const url = 'mongodb://172.17.0.2:27017';

// // Database Name
// const dbName = '';

// // Create a new MongoClient
// const client = new MongoClient(url,{ useUnifiedTopology: true });

// // Use connect method to connect to the Server
// client.connect(function(err) {
//   assert.equal(null, err);
//   console.log("Connected successfully to server");

//   const db = client.db(dbName);

//   client.close();
// });


