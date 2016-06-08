var config = require('config');
var app = {
  root : __dirname,
  config : config
};


app.word = require('./services/word')(app);
app.server.create();

console.log(app.config);
