var express = require("express");
var app = express();
var request = require("request");
const PORT = 3000;
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");
var seedDB = require("./seeds");
var passport = require("passport");
var localStrategy = require("passport-local");
var User = require("./models/user");
var commentRoutes = require("./routes/comments");
var campgroundRoutes = require("./routes/campgrounds");
var authRoutes = require("./routes/index");
// ==============================================================================================
mongoose.connect("mongodb://172.17.0.3:27017", { useNewUrlParser: true, useUnifiedTopology: true });

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(function (req, res, next) {
    res.locals.currentUser = req.user;
    next();
});
// seedDB();
// ==============================================================================================
// Passport Configuration
app.use(require("express-session")({
    secret: "What is going on here?",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(commentRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use(authRoutes);

// ==============================================================================================
app.listen(PORT, process.env.IP, function () {
    console.log("YelpCamp Server has started!");
});

