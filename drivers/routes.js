var exp = require('express');
module.exports = function(app){
	return {
		create : function(express){
			var _routes = app.config.routes;
			express.use('/assets',exp.static('assets'));
			for (var i = _routes.length - 1; i >= 0; i--) {	
				(function(_r){
					express.get(_r.path,function(req,res){
						res.sendFile(app.root+'/views/'+_r.view+'.html');
					});
				})(_routes[i]);				
			};
		}
	};
}