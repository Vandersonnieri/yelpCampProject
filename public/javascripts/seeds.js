let mongoose = require('mongoose');
let Campgrounds = require('./models/campgrounds');
let Comments = require('./models/comments')

//create data array

let data = [
	{
		name: "Dirty River",
		description: "Amazing campground. River is clean, it's just a name",
		image: "https://images.unsplash.com/photo-1508873696983-2dfd5898f08b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60"
	},
	{
		name: "High Fever's",
		description: "It will cure your low fever",
		image: "https://images.unsplash.com/photo-1537565266759-34bbc16be345?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60"
	},
	{
		name: "No Humans Allowed",
		description: "Humans are not allowed inside our camps",
		image: "https://images.unsplash.com/photo-1537905569824-f89f14cceb68?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60"
	}
]

function seedDB() {
	//remove all data
	Campgrounds.remove({}, err => {
		if (err) {
			console.log(err)
		} else {
			console.log("database removed");
			data.forEach(campground => {
				Campgrounds.create(campground, (err, campground) => {
					if (err) {
						console.log(err);
					} else {
						console.log("campground created");
						//create comments
						Comments.create({
							author: "Vanderson",
							text: "I had an ok time in this place. Bear killed my son, but I didn't like him anyway"
						}, (err, comment) => {
							if (err) {
								console.log(err);
							} else {
								campground.comments.push(comment);
								campground.save();
								console.log("comment created");
							}
						});
					}
				});
			});
		}
	});
}

module.exports = seedDB;


