// Dependencies
// =============================================================

// This may be confusing but here Sequelize (capital) references the standard library
var Sequelize = require("sequelize");
// sequelize (lowercase) references our connection to the DB.
var sequelize = require("../config/connection.js");



// Creates a "products" model that matches up with DB
 var products = sequelize.define("products", {
    product_name: Sequelize.STRING,
    product_availability: Sequelize.BOOLEAN,
   


  },{ timestamps: false});



  


// Makes the products Model available for other files (will also create a table)
module.exports = products; 
