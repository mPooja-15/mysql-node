module.exports = app => {
    const grns = require("../controllers/grnItem.controller.js");
  
    var router = require("express").Router();
  
    // Create a new grns
    router.post("/grnItem/create", grns.createGrnItem);
  
    // Retrieve all grns
    router.get("/grnItem", grns.findAll);
  
  
    // Retrieve a single grns with id
    router.get("/grn/view/:id", grns.findOne);
  
    // Update a grns with id
    router.put("/grn/:id", grns.update);
  
    // Delete a grns with id
    router.delete("/grn/:id", grns.delete);
  
    // Delete all grns
    router.delete("/", grns.deleteAll);
  
    app.use('/api', router);
  };
  