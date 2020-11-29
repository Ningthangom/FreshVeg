// Dependencies
// =======================================================================
const express = require("express");

const router = express.Router();

const db = require("../models");


// *********************************************************************************
// html-routes.js - this section offers a set of routes for sending users to the various html pages
// *********************************************************************************
// route for an individual farmer's page
const { Op } = require("sequelize");
const products = require("../models/products");


 // route for an individual farmer's page
 router.get("/farmer", (req, res) =>{
     const farmers = db.farmers.findAll();
 /*     console.log(farmers);
     console.log(db.farmers); */
    db.farmers.findAll().then(function(data) {
           /*  console.log(data); */
            let hdbrsObj = {
              farmers: data
            };
            res.render("index", hdbrsObj);
          });
    });
 

 router.get("/", (req, res) =>{
    const products = db.products.findAll();
    /*     console.log(products);
        console.log(db.products); */
       db.products.findAll().then(function(data) {
            /*    console.log(data); */
               let hdbrsObj = {
                products: data
               };
               res.render("vege", hdbrsObj);
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


