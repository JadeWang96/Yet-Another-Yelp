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
router.post("/", isLoggedIn, function (req, res) {
    // get the data from form and add to campgrounds
    var name = req.body.name;
    var image = req.body.image;
    var description = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    }
    var newCampGround = { name: name, image: image, description: description, author: author };
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
router.get("/new", isLoggedIn, function (req, res) {
    res.render("campgrounds/new", { currentUser: req.user });
});

// SHOW
router.get("/:id", function (req, res) {
    Campground.findById(req.params.id).populate("comments").exec(function (err, foundCampground) {
        if (err) {
            console.log(err);
        } else {
            res.render("campgrounds/show", { campground: foundCampground, currentUser: req.user });
        }
    });
});

// EDIT
router.get("/:id/edit", checkOwnerShip, function (req, res) {
    Campground.findById(req.params.id, function (err, foundCampground) {
        if (err) {
            console.log(err);
        } else {
            res.render("campgrounds/edit", { campground: foundCampground, currentUser: req.user });
        }
    });

});

// UPDATE
router.put("/:id", checkOwnerShip, function (req, res) {
    // find and update
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function (err, updatedCampground) {
        if (err) {
            res.redirect("/campgrounds");
        } else {
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

// Destroy
router.delete("/:id", checkOwnerShip, function (req, res) {
    Campground.findByIdAndRemove(req.params.id, function (err) {
        if (err) {
            res.redirect("/campgrounds");
        } else {
            res.redirect("/campgrounds");
        }
    });
});

// middleware
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
};


function checkOwnerShip(req, res, next) {
    if (req.isAuthenticated()) {
        Campground.findById(req.params.id, function (err, foundCampground) {
            if (err) {
                res.redirect("/campgrounds");
            } else {
                if (foundCampground.author.id.equals(req.user._id)) {
                    return next();
                } else {
                    res.redirect("back");
                }
            }
        });
    } else {
        res.redirect("back");
    }
}
module.exports = router;