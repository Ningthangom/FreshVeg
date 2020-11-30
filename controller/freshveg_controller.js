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
    try { 
        db.products.findAll().then(function(data) {
            
            let hdbrsObj = {
                products: data
            };
                res.render("vege", hdbrsObj);
            });
    } catch(error) {
        res.status(500).send('Error, something is not working please try again.')
    }
});
 // route for an individual farmer's page
 router.get("/farmer", (req, res) =>{
    try {
        db.farmers.findAll().then(function(data) {
           
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
    } catch (error) {
        res.status(500).send('Error, could not access vege database.')
    }
    });
 
router.get("/farmer/:sales", (req, res) =>{
    try {
    let vegeparameter =  req.params.sales

        db.sales.findOne({
            where:{     
                
            },include: {model:products,
                where:{
                    product_name: vegeparameter
                }
            }
        }).then(function(data) {
            
             let vegeUppercase = vegeparameter.toUpperCase();

             let hdbrsObj = {
             sales: data,
             product_name: vegeUppercase
             };
             
            res.render("sales", hdbrsObj)
        });
    } catch (error) {
        res.status(500).send('Error, selected vegetable could not load, either the server is down for maintenance or the desired produce is no longer for sale.')
    }
});

module.exports = router;


