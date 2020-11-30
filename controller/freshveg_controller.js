// Dependencies
// =======================================================================
const express = require("express");

const router = express.Router();

const db = require("../models");

const {rando, randoSequence} = require('@nastyox/rando.js');


// *********************************************************************************
// html-routes.js - this section offers a set of routes for sending users to the various html pages
// *********************************************************************************
// route for an individual farmer's page
const { Op } = require("sequelize");
const products = require("../models/products");

router.get("/", (req, res) =>{
    const products = db.products.findAll();
      /*   console.log(products);
        console.log(db.products); */
       db.products.findAll().then(function(data) {
            /*    console.log(data); */
               let hdbrsObj = {
                products: data
               };
               res.render("vege", hdbrsObj);
             });
});
 // route for an individual farmer's page
 router.get("/farmer", (req, res) =>{
/*      const farmers = db.farmers.findAll(); */
 /*     console.log(farmers);
     console.log(db.farmers); */
    db.farmers.findAll().then(function(data) {
           /*  console.log(data); */
           let vegeArray = ['tomato','potato','onion','brocoli','pineapple','avocado','mango','banana','pomegranate'];

           //randomised vege Value
           let selector = rando(0, (vegeArray.length-1))
           let selectedVege = vegeArray[selector]
            let hdbrsObj = {
              farmers: data,
              product_name: selectedVege
            };


            res.render("index", hdbrsObj);
          });
    });
 
router.get("/farmer/:sales", (req, res) =>{
    let vegeparameter =  req.params.sales

        db.sales.findOne({
            where:{     
                
            },include: {model:products,
                where:{
                    product_name: vegeparameter
                }
            }
        }).then(function(data) {
            /*  console.log(data); */
             let vegeUppercase = vegeparameter.toUpperCase();
             let hdbrsObj = {
             sales: data,
             product_name: vegeUppercase
             };
            res.render("sales", hdbrsObj);
        });
});
    
// API Routes
// =====================================================
router.get("/api/farmer"), (req,res) => {
    // api get request to call in farmer table information to create info cards
    farmers.findAll({}).then((results) => {
        res.json(results)
    })
}


module.exports = router;


