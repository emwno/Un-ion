module.exports = function(app) {

	/* GET check logged in or not */
	app.get('/login/check', function(req, res) {
		Backendless.UserService.getCurrentUser()
			.then(currentUser => {
				if (currentUser) {
					res.status(200);
				} else {
					res.status(401);
				}
				res.send();
			})
			.catch(error => {
				console.log('Check Error: ' + error);
				res.status(401);
				res.send();
			});
	});

	app.post('/logout', function(req, res) {
		Backendless.UserService.logout()
			.then(function() {
				console.log('Logout successful');
				res.status(200);
				res.send();
			})
			.catch(function(error) {
				console.log('logout unsuccessful!');
				res.status(400);
				res.send();
			});
	});

	app.post('/login/register', function(req, res){
		console.log("In the Register Function! ");
		var user = new Backendless.User();
		user.username = req.body.username;
		user.password = req.body.password;
		user.name = req.body.username + ' coolio';
		Backendless.UserService.register(user)
		.then(function(registeredUser){
			res.status(200);
			res.send();
		}).catch(function(erro){
			console.log(erro);
			res.status(401);
			res.send(erro);
		});
	});

	/* GET login listing. */
	app.post('/login', function(req, res) {
		console.log("AAHAN IS HERE");
		console.log('POST /login');
		Backendless.UserService.login(
			req.body.username,
			req.body.password,
			true
		)
			.then(function(loggedInUser) {
				console.log('Login Successful');
				res.status(200);
				res.send();
			})
			.catch(function(error) {
				console.log('Login Unsuccessful: ' + error);
				res.status(401);
				res.send();
			});

		// res.send({ 'got': 'sdddd' });
	});
};
