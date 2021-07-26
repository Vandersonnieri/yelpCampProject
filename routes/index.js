let express  = require('express'),
		router   = express.Router(),
		passport = require('passport'),
		User     = require('../models/user')


router.get("/", (req, res) => {
	res.render("landing");
});

router.get("/register", (req, res) => {
	res.render('register');
});

router.post("/register", (req, res) => {
	User.register(new User({username: req.body.username}), req.body.password, (err, user) => {
		if(err) {
			console.log(err);
			req.flash("error", err.message);
			res.redirect('/register');
		} else {
			passport.authenticate('local') (req, res, () => {
				req.flash("success", "Welcome " + user.username + "!");
				res.redirect("/campgrounds");
			});
		}
	});
});

router.get("/login", (req, res) => {
	res.render("login");
});

router.post("/login", passport.authenticate('local', {
	successRedirect: "/campgrounds",
	failureRedirect: "/login"
}), (req, res) => {
});

router.get("/logout", (req, res) => {
	req.logout();
	req.flash("success", "Logged Out");
	res.redirect("/campgrounds");
});

module.exports = router;
