
const express = require(express);
const db = require("../models");


app.post("/api/farmer/addvege", function(req, res) {
    db.products.update(req.body).then(function(vegeRes) {
      res.json(vegeRes);
    });
  });