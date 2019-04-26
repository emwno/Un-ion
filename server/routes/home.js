module.exports = function(app) {
	/* GET home listing. */
	app.get('/', function(req, res) {
		Backendless.UserService.getCurrentUser()
			.then(currentUser => {
				console.log('Fetched User: ' + currentUser.name);

				Backendless.Data.of('Users').findById(currentUser.objectId)
					.then(updatedUser => {
						console.log('Updated Fetched User');
						res.status(200);
						res.send(updatedUser);
					})
					.catch(error => {
						console.log('Updated Fetched User Error');
						res.status(401);
						res.send();
					});
			})
			.catch(error => {
				console.log('Fetch User Error: ' + error);
				res.status(401);
				res.send();
			});
	});
};
