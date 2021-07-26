let 	express               = require('express'),
			app 				          = express(),
			bodyParser 		        = require('body-parser'),
			mongoose              = require('mongoose'),
			methodOverride        = require('method-override'),
			passport              = require('passport'),
			localStrategy         = require('passport-local'),
			passportLocalMongoose = require('passport-local-mongoose'),

			// seedDB				 = require('./seeds'),
			Campgrounds    = require('./models/campgrounds'),
			Comments       = require('./models/comments'),
			User           = require('./models/user'),

			flash		   = require('connect-flash') //for flash messages

//requiring separate routes files
let   campgroundRoutes  = require('./routes/campgrounds'),
		indexRoutes     = require('./routes/index'),
		commentRoutes   = require('./routes/comments')


app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.use(express.static("public"));

app.use(flash()); //flash setup

app.set("view engine", "ejs");

//depracation problems
mongoose.set('useUnifiedTopology', true);
mongoose.set('useFindAndModify', false);
mongoose.connect('mongodb://localhost/campgrounds', {useNewUrlParser: true});

//creating a sassion
app.use(require('express-session') ({
	secret: "my name is Van",
	resave: false,
	saveUninitialized: false
}));

//passport configuration
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


//middleware to send data to every ejs file
app.use(function (req, res, next) {
	res.locals.success = req.flash("success");
	res.locals.error = req.flash("error"); //rendering flash messages to all templates
	res.locals.currentUser = req.user;
	next(); //needs next to move on to the next route
});

// seedDB();


