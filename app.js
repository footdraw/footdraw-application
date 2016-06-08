var config = require('config');
var app = {
  root : __dirname,
  config : config
};

app.server = require('./drivers/server')(app);
app.handlebars = require('./drivers/handlebars')(app);

app.word = require('./services/word')(app);
app.server.create();

console.log(app.config);
