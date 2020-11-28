// This may be confusing but here Sequelize (capital) references the standard library
 // var Sequelize = require("sequelize");
// sequelize (lowercase) references our connection to the DB.
var sequelize = require("../config/connection.js"); 
const {DataTypes} = require('sequelize');
const products = require("./products.js");
const farmers = require("./farmers.js");
// Creates a "Chirp" model that matches up with DB
var sales = sequelize.define("sales", {

    total_price: DataTypes.DECIMAL,
},
{ timestamps: false});

sales.belongsTo(products,{
    foreignKey:"products_id"
})
sales.belongsTo(farmers,{
    foreignKey:"farmers_id"
})

// Syncs with DB
/* farmer.sync(); */

// Makes the Chirp Model available for other files (will also create a table)
//foreignKey declaration products to farmers



module.exports = sales;