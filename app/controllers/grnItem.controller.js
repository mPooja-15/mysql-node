const GRNS = require("../models/grnItem.model.js");

// Create and Save a new grnItem
exports.createGrnItem = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  // Create a grnItem
  const grnItem = new GRNS({
    productName: req.body.productName,
    quantity: req.body.quantity,
    stockPrice: req.body.stockPrice,
  });

  // Save grnItem in the database
  GRNS.create(grnItem, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the grnItem.",
      });
    else res.send({ message: "successfully grn created ", data: data });
  });
};

// Retrieve all grnItem from the database (with condition).
exports.findAll = (req, res) => {
  const title = req.query.title;

  GRNS.getAll(title, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving grnItem.",
      });
    else res.send(data);
  });
};

// Find a single grnItem by Id
exports.findOne = (req, res) => {
  GRNS.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found grnItem with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving grnItem with id " + req.params.id,
        });
      }
    } else res.send(data);
  });
};

// find all published grnItems
exports.findAllPublished = (req, res) => {
  GRNS.getAllPublished((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving grnItems.",
      });
    else res.send(data);
  });
};

// Update a grnItem identified by the id in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Data can not be empty!",
    });
  }

  console.log(req.body);

  GRNS.updateById(req.params.id, new GRNS(req.body), (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Grn with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Error updating Grn with id " + req.params.id,
        });
      }
    } else res.send({ message: "Successfully updated", data: data });
  });
};

// Delete a Grn with the specified id in the request
exports.delete = (req, res) => {
  GRNS.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Grn with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Could not delete Grn with id " + req.params.id,
        });
      }
    } else res.send({ message: `Grn was deleted successfully!` });
  });
};

// Delete all Grns from the database.
exports.deleteAll = (req, res) => {
  GRNS.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Grn.",
      });
    else res.send({ message: `All Grn were deleted successfully!` });
  });
};
