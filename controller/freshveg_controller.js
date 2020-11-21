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


// Routes
// =====================================================

module.exports = router;


