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
        game.score = req.body.score;
        game.timePlayed = req.body.timePlayed;

        // Save Game
        Backendless.Data.of(Game).save(game)
          .then(response => {
            console.log('Game: object saved');

            // Add USER relation to Game
            Backendless.Data.of(Game).setRelation(response, 'player', [currentUser])
              .then(count => {
                console.log('Game: player relation saved');

                // Add ARTICLES relation to Game
                Backendless.Data.of(Game).addRelation(response, 'articles', req.body.articles)
                  .then(count => {
                    console.log('Game: articles relation saved');
                  })
                  .catch(error => {
                    console.log("Error - Article Relation: " + error);
                  });
              })
              .catch(error => {
                console.log("Error - User Relation: " + error);
              });

          })
          .catch(error => {
            console.log("Error - Game Object: " + error);
          });
      })
      .catch(error => {
        console.log("Error - Game User: " + error);
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
    this.player = {};
    this.score = 0;
    this.timePlayed = 0;
    this.articles = [];
  }
};