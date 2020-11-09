const noteRoutes= require('./note_routes');

module.exports = function (app,database){
    noteRoutes(app,database);
}