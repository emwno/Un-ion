var express = require('express');

var indexRouter = require('./routes/index');
var loginRouter = require('./routes/login');

var app = express();

indexRouter(app);
loginRouter(app);

const port = 5000;
app.listen(port, () => `Server running on port ${port}`);