module.exports = function(app) {

  /* GET login listing. */
  app.post('/login', function(req, res) {
    console.log('POST /login');
    Backendless.UserService.login(req.body.username, req.body.password, true)
      .then(function(loggedInUser) {
        console.log('Login Successful');
        console.log(loggedInUser.name);
        req.session.currentUser = loggedInUser;
        res.status(200);
      })
      .catch(function(error) {
        console.log('Login Unsuccessful: ' + error);
        res.status(401);
    });

    // res.send({ 'got': 'sdddd' });
  });

};