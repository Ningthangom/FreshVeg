// Dependencies
// =======================================================================
const express = require("express");

const router = express.Router();

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
router.get("/:farmer", (req, res) =>{
    res.render("farmer")
})

//route for vegetables belonging to farmer

router.get("/farmer/:vegetable", (req, res) =>{
    //query farmer and veg
    res.render("vege")
})


// API Routes
// =====================================================

module.exports = router;


