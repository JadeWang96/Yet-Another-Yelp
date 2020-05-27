var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
// ==============================================================================================
// Campgrounds Routes
// INDEX
router.get("/", function (req, res) {
    Campground.find({}, function (err, campgrounds) {
        if (err) {
            console.log(err);
        } else {
            res.render("campgrounds/index", { campgrounds: campgrounds, currentUser: req.user });
        }
    });
});

// CREATE
router.post("/", function (req, res) {
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
router.get("/new", function (req, res) {
    res.render("campgrounds/new");
});

// SHOW
router.get("/:id", function (req, res) {
    Campground.findById(req.params.id).populate("comments").exec(function (err, foundCampground) {
        if (err) {
            console.log(err);
        } else {
            res.render("campgrounds/show", { campground: foundCampground });
        }
    });
});


function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
};

module.exports = router;