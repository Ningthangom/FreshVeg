// Dependencies
// =============================================================


// sequelize (lowercase) references our connection to the DB.
 var sequelize = require("../config/connection.js");

 const {DataTypes} = require('sequelize')
 // Creates a "farmers" model that matches up with DB
var farmers = sequelize.define("farmers", {
  first_name: DataTypes.STRING,
  last_name: DataTypes.STRING,
});


//export the model
module.exports = farmers;
