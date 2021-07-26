let   express = require('express'),
		  router  = express.Router(),
		  Campgrounds = require('../models/campgrounds'),
		  middleware  = require('../middleware') //automaticaly require index.js


router.get("/", (req, res) => {
	Campgrounds.find({}, (err, campgrounds) => {
		if (err) {
			req.flash("error", err.message);
			console.log(err);
		} else {
			res.render("campgrounds/index", {campgrounds: campgrounds});
		}
	});
});

router.get("/new", middleware.isLoggedIn, (req, res) =>{
	res.render("campgrounds/new");
});

router.post("/", middleware.isLoggedIn, (req, res) => {
	Campgrounds.create(req.body.campground, (err, campground) => {
		if (err) {
			req.flash("error", err);
			console.log(err);
		} else {
			campground.author.username = req.user.username;
			campground.author.id = req.user._id;
			campground.save();
			req.flash("success", "Campground Created!");
			console.log(campground);
			res.redirect("/campgrounds");
		}
	});
});

router.get("/:id", (req, res) => {
	Campgrounds.findById(req.params.id).populate("comments").exec((err, campground) => {
		if (err) {
			console.log(err);
		} else {
			res.render("campgrounds/show", {campground: campground});
		}
	});
});

router.get("/:id/edit", middleware.campgroundOwner, (req, res) => {
	Campgrounds.findById(req.params.id, (err, campground) => {
		res.render("campgrounds/edit", {campground: campground});
	});
});

router.put("/:id", middleware.campgroundOwner, (req, res) => {
	Campgrounds.findByIdAndUpdate(req.params.id, req.body.campground, (err, campground) => {
		if (err) {
			console.log(err);
		} else {
			req.flash("success", "Campground Updated!");
			res.redirect("/campgrounds");
		}
	});
});

//create delete route
router.delete("/:id", middleware.campgroundOwner,  (req, res) => {
	Campgrounds.findByIdAndRemove(req.params.id, (err, campground) => {
		if (err) {
			console.log(err);
		} else {
			req.flash("success", "Campground Deleted!");
			res.redirect("/campgrounds");
		}
	});
});


module.exports = router;










