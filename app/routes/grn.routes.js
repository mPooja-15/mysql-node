module.exports = app => {
  const grns = require("../controllers/grn.controller.js");

  var router = require("express").Router();

  // Create a new grnItem
  router.post("/grn/create", grns.create);

  // Retrieve all grns
  router.get("/", grns.findAll);

  // Retrieve all published grns
  router.get("/published", grns.findAllPublished);

  // Retrieve a single grnItem with id
  router.get("/grn/view/:id", grns.findOne);

  // Update a grnItem with id
  router.put("/grn/:id", grns.update);

  // Delete a grnItem with id
  router.delete("/grn/:id", grns.delete);

  // Delete all grns
  router.delete("/", grns.deleteAll);

  app.use('/api', router);
};
