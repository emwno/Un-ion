module.exports = function(app) {
	/* GET home listing. */
	app.get('/', function(req, res, next) {
		Backendless.UserService.getCurrentUser()
			.then(currentUser => {
				console.log('Fetched User: ' + currentUser.name);
				res.status(200);
				res.send(currentUser);
			})
			.catch(error => {
				console.log('Fetch User Error: ' + error);
				res.status(401);
				res.send();
			});
	});
};
