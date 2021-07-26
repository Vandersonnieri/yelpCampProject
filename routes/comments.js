 let   express     = require('express'),
			router 	    = express.Router({mergeParams: true}),
			Campgrounds = require('../models/campgrounds'),
			Comments    = require('../models/comments'),
			middleware  = require('../middleware')

router.get("/new", middleware.isLoggedIn, (req, res) => {
	Campgrounds.findById(req.params.id, (err, campground) => {
		if (err) {
			console.log(err);
		} else {
			res.render("comments/new", {campground: campground});
		}
	});
});

router.post("/", middleware.isLoggedIn, (req, res) => {
	Campgrounds.findById(req.params.id, (err, campground) => {
		if (err) {
			console.log(err);
		}else {
			Comments.create(req.body.comment, (err, comment) => {
				if (err) {
					req.flash("error", err.comment);
					console.log(err);
				} else {
					comment.author.id = req.user._id;
					comment.author.username = req.user.username;
					comment.save();
					campground.comments.push(comment);
					campground.save();
					req.flash("success", "Comment Adeed!")
					console.log(comment);
					res.redirect("/campgrounds/" + req.params.id);
				}
			});
		}
	});
});

router.get("/:comment_id/edit", middleware.commentOwner, (req, res) => {
	Comments.findById(req.params.comment_id, (err, comment) => {
		if (err){
			console.log(err);
			res.redirect("back");
		} else {
			res.render("comments/edit", {campground_id: req.params.id, comment: comment});
		}
	});
});

router.put("/:comment_id", middleware.commentOwner, (req, res) => {
	Comments.findByIdAndUpdate(req.params.comment_id, req.body.comment, (err, comment) => {
		if(err) {
			console.log(err);
			res.redirect("back");
		} else {
			req.flash("success", "Comment Updated!");
			res.redirect("/campgrounds/" + req.params.id);
		}
	});
});

router.delete("/:comment_id", middleware.commentOwner, (req, res) => {
	Comments.findByIdAndRemove(req.params.comment_id, (err, campground) => {
		if(err) {
			console.log(err);
		} else {
			req.flash("success", "Comment Deleted!");
			res.redirect('/campgrounds/' + req.params.id);
		}
	});
});



module.exports = router;








