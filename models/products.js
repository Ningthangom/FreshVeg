// Dependencies
// =============================================================

// This may be confusing but here Sequelize (capital) references the standard library
var Sequelize = require("sequelize");
// sequelize (lowercase) references our connection to the DB.
var sequelize = require("../config/connection.js");

// Creates a "Chirp" model that matches up with DB


// Creates a "Chirp" model that matches up with DB
var products = sequelize.define("product", {
    product_name: Sequelize.STRING,
    price_kg: Sequelize.DECIMAL,
    product_availability: Sequelize.BOOLEAN,

  });
  
  // Syncs with DB
  products.sync();

// Makes the Chirp Model available for other files (will also create a table)
module.exports = products;