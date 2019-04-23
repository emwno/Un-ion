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

  function Article() {
    this.objectId = "";
    this.title = "";
    this.link = "";
    this.thumbnail = "";
    this.fakeNews = false;
  }

};