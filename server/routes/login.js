module.exports = function(app) {
  
  /* GET check logged in or not */
  app.get("/login/check", function(req, res) {
    let check = req.session.currentUser == null;
    if (check == null) {
      res.status(401);
      res.send();
    } else {
      res.status(200);
      res.send();
    }
  });

  app.post("/logout", function(req, res) {
    Backendless.UserService.logout().then(function(){
      console.log("Logout successful");
      req.session.currentUser = null;
      res.status(200);
      res.send();
    }).catch(function(error){
      console.log("logout unsuccessful!");
      res.status(400);
      res.send();
    });
    
  });

  /* GET login listing. */
  app.post("/login", function(req, res) {
    console.log("POST /login");
    Backendless.UserService.login(req.body.username, req.body.password, true)
      .then(function(loggedInUser) {
        console.log("Login Successful");
        req.session.currentUser = loggedInUser;
        res.status(200);
        res.send();
      })
      .catch(function(error) {
        console.log("Login Unsuccessful: " + error);
        res.status(401);
        res.send();
      });

    // res.send({ 'got': 'sdddd' });
  });
};
