let Campgrounds = require('../models/campgrounds'),
		Comments    = require('../models/comments')


let middlewareObj = {};

middlewareObj.campgroundOwner = function(req, res, next) {
	if(req.isAuthenticated()) {   //check if user is logged in
		Campgrounds.findById(req.params.id, (err, campground) => {
			if (err) {
				console.log(err);
				res.redirect("back");
			} else {
				//check if user created campground (.equals)
				if(campground.author.id.equals(req.user._id)) {     //can't compare, one is a string the other is an object
					next();
				} else {
					req.flash("error", "Permition Required");
					res.redirect("/campgrounds");
				}
			}
		});
	}else {
		req.flash("error", "Login Required");
		res.redirect("/campgrounds");
	}
}


middlewareObj.commentOwner = function(req, res, next) {
	if(req.isAuthenticated()) {   //check if user is logged in
		Comments.findById(req.params.comment_id, (err, comment) => {
			if (err) {
				console.log(err);
				res.redirect("back");
			} else {
				//check if user created comment (.equals)
				if(comment.author.id.equals(req.user._id)) {     //can't compare, one is a string the other is an object
					next();
				} else {
					req.flash("error", "Permition Required");
					res.redirect("/campgrounds");
				}
			}
		});
	}else {
		req.flash("error", "Login required");
		res.redirect("/campgrounds");
	}
}

middlewareObj.isLoggedIn = function(req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	}
	req.flash("error", "Login Required"); // creating key value for flash message (before redirect)
	res.redirect("/login");
}


module.exports = middlewareObj;
























