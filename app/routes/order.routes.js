module.exports = app => {
    const orders = require("../controllers/order.controller.js");
  
    var router = require("express").Router();
  
    // Create a new orders
    router.post("/order/create", orders.createOrder);
  
    // Retrieve all orders
    router.get("/", orders.findAll);
  
  
    // Retrieve a single orders with id
    router.get("/orders/view/:id", orders.findOne);
  
    // Update a orders with id
    router.put("/orders/:id", orders.update);
  
    // Delete a orders with id
    router.delete("/orders/:id", orders.delete);
  
    // Delete all orders
    router.delete("/", orders.deleteAll);
  
    app.use('/api', router);
  };
  