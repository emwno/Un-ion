module.exports = function(app) {

  /* GET home listing. */
  app.get('/game', function(req, res, next) {

    var queryBuilder = Backendless.DataQueryBuilder.create();
    queryBuilder.setPageSize(100);

    Backendless.Data.of(Article).find(queryBuilder)
      .then(result => {
        res.status(200);
        res.send(result);
      })
      .catch(error => {
        console.log(error);
        res.status(400);
        res.send();
      });
  });

  app.post('/game/save', function(req, res){
    
    Backendless.UserService.getCurrentUser()
    .then(currentUser => {

      console.log("IN GAME SAVE");
      var game = new Game();
      game.player = currentUser.objectId;
      game.score = req.body.score;
      game.timePlayed = req.body.timePlayed;
      game.articles = req.body.articles;  
      Backendless.Data.of(Game).save(game).then(response =>{
        console.log(response);
      }).catch(error=>{
        console.log(error);
      });
    })
    .catch(error => {
      console.log("Game Save Error: " + error);
      res.status(401);
      res.send();
    });
  });

  function Article() {
    this.objectId = "";
    this.title = "";
    this.link = "";
    this.thumbnail = "";
    this.fakeNews = false;
  }

  function Game(){
    this.player = "";
    this.score = 0;
    this.timePlayed = 0;
    this.articles = [];
  }
};