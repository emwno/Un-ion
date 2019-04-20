module.exports = function(app) {

  /* GET home listing. */
  app.get('/', function(req, res, next) {
    const data = [
      {title: 'Fake 1', source: 'onion'},
      {title: 'Fake 2', source: 'nottheonion'},
    ];

    res.json(customers);
  });

};