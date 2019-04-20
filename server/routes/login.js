module.exports = function(app) {

  /* GET login listing. */
  app.get('/login', function(req, res, next) {
    const customers = [
      {title: 'Login'},
      {title: 'Login'},
    ];

    res.json(customers);
  });

};