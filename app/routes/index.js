const recipeRoute = require('./recipe_route');
module.exports = function(app, db) {
	recipeRoute(app, db);
};