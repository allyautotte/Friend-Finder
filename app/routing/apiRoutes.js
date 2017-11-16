
	var friendData = require('../data/friends.js');

	module.exports = function (app) {

	app.get('/data/friends', function (req, res) {
		res.json(friendData);
	});

	app.post('/data/friends', function (req, res) {

		// Converts the survey scores from str to int
		for (var i=0; i<req.body.scores.length; i++) {
			var integer = parseInt(req.body.scores[i]);
			req.body.scores[i] = integer;
		}

		
		friendData.push(req.body);
		console.log("User's scores: " + req.body.scores);

		// Compatibility logic
		var bestMatch = 0;
		var lowestDifference = 40; 

	
		for (var i=0; i<friendData.length - 1; i++) {
			console.log("Friend #" + i + "'s scores: " + friendData[i].scores);
			
			var totalDifference = 0;

		
			for (var j=0; j<friendData[i].scores.length; j++) {
				totalDifference += Math.abs(friendData[i].scores[j] - req.body.scores[j]);
			}

			console.log(totalDifference);


			if (totalDifference < lowestDifference) {
				bestMatch = i;
				lowestDifference = totalDifference;
			}
		}


		res.send(friendData[bestMatch]);

		console.log("Best match: " + bestMatch);
		console.log("Lowest diff: " + lowestDifference);
		console.log("---------------------------------");
	});
};