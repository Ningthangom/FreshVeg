
// ========================================================================

 // Dependencies
var Sequelize = require("sequelize");

// Creates mySQL connection using Sequelize, the empty string in the third argument spot is our password.
var sequelize = new 
Sequelize("thjgsjh6mvck6pc7", "rcp5kgnzh5w2y4w4", "mr7txoqjdyittef0", {
  host: "tyduzbv3ggpf15sx.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
  port: 3306,
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  }
});


// Exports the connection for other files to use
module.exports = sequelize;  