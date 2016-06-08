var handlebars = require("node-handlebars");

module.exports = function(app) {

  return {
    instance : null,
    render : function(view, json) {
      var hbs = handlebars.create({
        partialsDir :__dirname
       });

      hbs.engine(app.root + "/" + view + "", json, function(err, html) {
        if (err) {
          throw err;
        }
        console.log(html);
      });
    },

    listen : function() {
      this.instance.listen(3000, function() {
        console.log('Server listening on *:3000');
      })
    }
  }
}
