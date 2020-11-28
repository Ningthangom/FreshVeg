// Dependencies
// =============================================================

const products = require("./products");

// This may be confusing but here Sequelize (capital) references the standard library
 // var Sequelize = require("sequelize");
// sequelize (lowercase) references our connection to the DB.
 var sequelize = require("../config/connection.js"); 
 const {DataTypes} = require('sequelize')
 // Creates a "Chirp" model that matches up with DB
var farmers = sequelize.define("farmers", {
  first_name: DataTypes.STRING,
  last_name: DataTypes.STRING,
});

// Syncs with DB
/* farmer.sync(); */

// Makes the Chirp Model available for other files (will also create a table)
//foreignKey declaration products to farmers

farmers.hasMany(products, {
  foreignKey: 'farmer_id'
});
products.belongsTo(farmers);


module.exports = farmers;

/* 
module.exports = function(sequelize, DataTypes) {
  var farmer = sequelize.define("farmer", {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING
});
  return farmer;
}; */