const mongoose = require("mongoose");
const customers = require("../models/customers");
const express = require("express");
let router = express.Router();

router.get("/:id", (req, res) => {
  customers.findById({ _id: req.params.id }, (err, foundCustomer) => {
    if (err) {
      res.status(404).send(err.message);
    } else {
      res.render("index", { genres: foundCustomer });
      console.log(foundCustomer);
    }
  });
});

router.put("/:id", (req, res) => {
  let updatedCustomer = {
      name: req.body.name,
      phone: req.body.phone,
      isGold: req.body.isGold
  };

  customers.update({ _id: req.params.id }, updatedCustomer, (err, success) => {
    if (err) res.status(404).send(err.message);
    else res.redirect("/");
  });
});

router.delete("/:id", (req, res) => {
  customers.deleteOne({ _id: req.params.id }, (err, success) => {
    if (err) res.status(404).send(err.message);
    else res.redirect("/");
  });
});

module.exports = router;
