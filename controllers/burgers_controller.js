var express = require("express");

var router = express.Router();

// Import the model to use its database functions.
var burger = require("../models/burger.js");

// Create all our routes and set up logic within those routes where required.
router.get("/", function(req, res) {
  burger.all(function(data) {
    var hbsObject = {
      burgers: data
    };
    console.log(hbsObject);
    res.render("index", hbsObject);
  });
});

router.post("/api/burgers", function(req, res) {
  burger.create([
    ["burger_name", "devoured"],
  ], [
    req.body.burger_name, req.body.devoured
  ], function(result) {
    // Send back the ID of the new quote
    res.json({ id: result.insertId });
  });
});

router.put("/api/burgers/:id", function(req, res) {
  var condition = "id = " + req.params.id;

  console.log("condition", condition);

  burger.update({
    sleepy: req.body.sleepy
  }, condition, function(result) {
    if (result.changedRows == 0) {
      // If no rows were changed, then the ID must not exist, so 404
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});
// The `catsController.js` file to have a `/api/cats/:id` delete route, 
// to call the delete key of the cat model, and to pass in arguments as necessary
router.delete("/api/burgers/:id", (req, res) => {
  // req.params --> we have req.params.id
  // req.body --> not needed
  // query.... no do we have model? --> we will use the cat.delete
  burger.delete({ id: req.params.id }, data => {
    // errs -> no error input
    // data hande it
    console.log(data);
    res.json(data);
  });
});

// Export routes for server.js to use.
module.exports = router;
