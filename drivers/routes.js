var exp = require('express'),
	exphbs  = require('express-handlebars');
module.exports = function(app){
	return {
		create : function(express){
			var _routes = app.config.routes;
			express.engine('handlebars',exphbs({defaultLayout: 'main'}));
			express.set('view engine', 'handlebars');

			express.use('/assets',exp.static('assets'));
			express.use('/config',exp.static('config'));
			express.use('/node_modules',exp.static('node_modules'));


			for (var i = _routes.length - 1; i >= 0; i--) {
				(function(_r){
					express.get(_r.path,function(req,res){
						(_r.data=='login')? res.render(_r.view,{login : true}) : res.render(_r.view);
					});
				})(_routes[i]);				
			};
		}
	};
}