// Dependencies
// =======================================================================
const express = require("express");

const router = express.Router();

/* const { Op } = require("sequelize"); */
/* const { sequelize } = require("../models"); */

const db = require("../models");
/* const farmers = require("../models/farmers.js"); */

// *********************************************************************************
// html-routes.js - this section offers a set of routes for sending users to the various html pages
// *********************************************************************************
// route for an individual farmer's page


 // route for an individual farmer's page
 router.get("/farmer", (req, res) =>{
     const farmer = db.farmer.findAll();
     console.log(farmer);
     console.log(db.farmer);
    db.farmer.findAll().then(function(data) {
            console.log(data);
            var hdbrsObj = {
              farmer: data
            };
            res.render("index", hdbrsObj);
          });
    });
 
 

/* 
  // route for an individual farmer's page
router.get("/farmer", (req, res) =>{
    db.farmers.findAll({  
        
    attributes: ['id']

})  sequelize.query("SELECT first_name last_name FROM farmer AS farmer").then(function(data) {
            console.log(data); 
            var hdbrsObj = {
              farmers: data
            };
            console.log(hdbrsObj);
            res.render("index", hdbrsObj);
          });
    })
  */



//Additional routes for other pages

/* router.get("/farmer", (req, res) => {
    try {
        farmers.findAll({
            attributes: ['first_name','last_name']
        })
        .then((farmerName) =>{
            //Need to build an array somehow?
            res.render("index", {
                first_name: farmerName.first_name,
                last_name:  farmerName.last_name,
            })
            console.log(farmers);
        })
    } catch (error) {
        console.log(error)
    }
});
 */
// route for an individual farmer's page
router.get("/farmers", (req, res) =>{
    res.render("farmer")
})

//route for vegetables belonging to farmer

router.get("/farmer/vegetable", (req, res) =>{
    //query farmer and veg
    res.render("vege")
})

router.get("/farmer/addvege", function(req, res) {
    res.render("addvege")
  });

// API Routes
// =====================================================
router.get("/api/farmer"), (req,res) => {
    // api get request to call in farmer table information to create info cards
    farmers.findAll({}).then((results) => {
        res.json(results)
    })
}
// sending the farmer.products data related to the specific farmer...
router.get("/api/farmer/vegetable", (req, res) => {

    // sequalize query to call the produce the farmer is selling.
    products.findAll({
        where: {
            [Op.and]: {
                farmer_id: req.params.farmer_id,
                product_availability: true,
            }
        }
    }).then((results) =>{
        res.json(results)
    })
})

//adding a vegetable or other data



module.exports = router;


