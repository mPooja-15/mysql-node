const sql = require("./db.js");

// constructor
const ORDERS = function (order) {
  this.status=order.status;
  this.invoicenumber=order.invoicenumber;
  this.customername=order.customername;
  this.customerFullAddress=order.customerFullAddress;
  this.orderLineItems=order.orderLineItems;
  this.date=order.date
};

ORDERS.create = (newGrn, result) => {
  sql.query("INSERT INTO order1 SET ?", newGrn, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created grn: ", { id: res.insertId, ...newGrn });
    result(null, { id: res.insertId, ...newGrn });
  });
};

ORDERS.findById = (id, result) => {
  sql.query(`SELECT * FROM order1 WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found grn: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found grn with the id
    result({ kind: "not_found" }, null);
  });
};

ORDERS.getAll = (status, result) => {
  let query = "SELECT * FROM order1";

  if (status) {
    query += ` WHERE status LIKE '%${status}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("grn: ", res);
    result(null, res);
  });
};


ORDERS.updateById = (id, grn, result) => {
  sql.query(
    "UPDATE order1 SET status = ?, invoicenumber = ?, customername = ? ,customerFullAddress = ? ,date = ? WHERE id = ?",
    [grn.status, grn.invoicenumber, grn.customername,grn.customerFullAddress,grn.date, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found grn with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated grn: ", { id: id, ...grn });
      result(null, { id: id, ...grn });
    }
  );
};

ORDERS.remove = (id, result) => {
  sql.query("DELETE FROM order1 WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found grn with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted grn with id: ", id);
    result(null, res);
  });
};

ORDERS.removeAll = result => {
  sql.query("DELETE FROM order1", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} grn`);
    result(null, res);
  });
};

module.exports = ORDERS;
