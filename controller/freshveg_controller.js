// Dependencies
// =======================================================================
const express = require("express");

const router = express.Router();

const { Op } = require("sequelize");

let Farmer = require("../models/farmers");

let products = require("../models/products");

// *********************************************************************************
// html-routes.js - this section offers a set of routes for sending users to the various html pages
// *********************************************************************************
router.get("/", (req, res) => {
    let vegetableObject = {
        sellerMessage: "Would you like to buy my Vegetables?",
        forSale: ["turnip", "bunyip", "whipyip"]
    }
    res.render("index", vegetableObject)
});

//Additional routes for other pages

// route for an individual farmer's page
router.get("/farmer", (req, res) =>{
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
    Farmer.findAll({}).then((results) => {
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


