// Dependencies
// =============================================================

// This may be confusing but here Sequelize (capital) references the standard library
var Sequelize = require("sequelize");
// sequelize (lowercase) references our connection to the DB.
var sequelize = require("../config/connection.js");

// Creates a "Chirp" model that matches up with DB
var farmers = sequelize.define("farmer", {
  first_name: Sequelize.STRING,
  last_name: Sequelize.STRING,
});

// Syncs with DB
farmers.sync();

// Makes the Chirp Model available for other files (will also create a table)
module.exports = farmers;