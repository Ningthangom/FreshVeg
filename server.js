//Dependencies for our application

//finding and retrieving the file
const path = require("path");

const express = require("express")

const _handlebars = require('handlebars')
const exphbs = require("express-handlebars");
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')

const PORT = process.env.PORT || 3001;
/*  */
const app = express();
//serve static contetnt for the app from the public directory.
//using/accessing routes file
app.use(express.static(path.join(__dirname + '/public')));

//Parse Application body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Set handlebars as the view engine
app.engine("handlebars", exphbs({ defaultLayout: "main", handlebars: allowInsecurePrototypeAccess(_handlebars) }));
app.set("view engine", "handlebars");



//Routes importing and usage
const routes = require("./controller/freshveg_controller.js");

let db = require("./models");

app.use(routes);
// Start our server so that it can begin listening to client requests.
//db.sequelize.sync({force:true}).then(function() {
  app.listen(PORT, function() {
    // Log (server-side) when our server has started
    console.log(`Server listening on: http://localhost:${PORT}`);
  });
  
//});


