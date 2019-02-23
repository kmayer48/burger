// This file sets up all of the routes for the application. MySQL queries are in here.
var express = require("express");
var router = express.Router();
var burger = require("../models/burger.js");

//Grabs all of the data from the burgers table. These are sorted later with Handlebars #if and #unless statements
router.get("/", function (req, res) {
  burger.selectAll(function (data) {
    res.render("index", {
      burgers: data
    });
  });
});

// Add new burger to the db.
router.post("/api/burgers", function (req, res) {
  burger.insertOne(["burger_name", "devoured"], [req.body.burger_name, req.body.devoured], function (result) {
    // Send back the ID of the new burger
    res.json({
      id: result.insertId
    });
  });
});

// Set burger devoured status to true.
router.put("/api/burgers/:id", function (req, res) {
  var condition = "id = " + req.params.id;
  burger.updateOne({
    devoured: req.body.devoured
  }, condition, function (result) {
    if (result.changedRows === 0) {
      // If no rows were changed, then the ID must not exist, so 404.
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});

// Delete burger from db.
router.delete("/api/burgers/:id", function (req, res) {
  var condition = "id = " + req.params.id;
  burger.deleteOne(condition, function (result) {
    if (result.changedRows === 0) {
      // If no rows were changed, then the ID must not exist, so 404.
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});

// exports controller for us in the server.js file.
module.exports = router;