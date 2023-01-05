const GRNS = require("../models/grn.model.js");

// Create and Save a new grn
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  // Create a grn
  const grn = new GRNS({
    status: req.body.status,
    invoiceNumber: req.body.invoiceNumber,
    vendorName: req.body.vendorName,
    vendorFullAddress: req.body.vendorFullAddress,
    grnLineItems: req.body.grnLineItems,
    date: req.body.date,
  });

  // Save grn in the database
  GRNS.create(grn, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the grn.",
      });
    else res.send({ message: "successfully grn created ", data: data });
  });
};

// Retrieve all grn from the database (with condition).
exports.findAll = (req, res) => {
  const title = req.query.title;

  GRNS.getAll(title, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving grn.",
      });
    else res.send(data);
  });
};

// Find a single grn by Id
exports.findOne = (req, res) => {
  GRNS.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found grn with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving grn with id " + req.params.id,
        });
      }
    } else res.send(data);
  });
};

// find all published grn
exports.findAllPublished = (req, res) => {
  GRNS.getAllPublished((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving grn.",
      });
    else res.send(data);
  });
};

// Update a grn identified by the id in the request
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
