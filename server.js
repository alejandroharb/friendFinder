var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
//==========server port, express APP declared==========
PORT = process.env.PORT || 3000;
var app = express();

//do this! to have a go-to root directory for all static files (images, pdfs, front-end js, etc)
app.use(express.static(__dirname + "/app/public"));

//==========express app to handle data parsing=============
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({type: "application/vnd.api+json"}));



// ================================================================================
// ROUTER
// The below points our server to a series of "route" files.
// These routes give our server a "map" of how to respond when users visit or request data from various URLs.
// ================================================================================
require("./app/routing/apiRoutes")(app);
require("./app/routing/htmlRoutes")(app);



app.listen(PORT, function() {
    console.log("listening on Port: " + PORT);
})