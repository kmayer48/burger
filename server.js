
var express = require("express");
var bodyParser = require("body-parser");
var methodOverride = require("method-override");
var exphbs = require("express-handlebars");
var app = express();
var PORT = process.env.PORT || 8080;

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static("public"));

// Parse application/x-www-form-urlencoded.
app.use(bodyParser.urlencoded({ extended: false }));

// Override with POST having ?_method=DELETE.
app.use(methodOverride("_method"));

//Select and set Handlebars as the engine and "main" as the default layout.
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

//Imports the routes from burgers_controller.
var routes = require("./controllers/burger_controllers");
app.use('/', routes);

app.listen(process.env.PORT || 8080, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});