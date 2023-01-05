const sql = require("./db.js");

// constructor
const GRNS = function (grn) {
  this.status = grn.status;
  this.invoiceNumber = grn.invoiceNumber;
  this.vendorName = grn.vendorName;
  this.vendorFullAddress = grn.vendorFullAddress;
  this.grnLineItems = grn.grnLineItems;
  this.date = grn.date;
};
GRNS.create = (newGrn, result) => {
  sql.query("INSERT INTO grn SET ?", newGrn, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created grn: ", { id: res.insertId, ...newGrn });
    result(null, { id: res.insertId, ...newGrn });
  });
};

GRNS.findById = (id, result) => {
  sql.query(`SELECT * FROM grn WHERE id = ${id}`, (err, res) => {
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

GRNS.getAll = (status, result) => {
  let query = "SELECT * FROM grn";

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

GRNS.getAllPublished = result => {
  sql.query("SELECT * FROM grn WHERE published=true", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("grn: ", res);
    result(null, res);
  });
};

GRNS.updateById = (id, grn, result) => {
  sql.query(
    "UPDATE grn SET status = ?, invoiceNumber = ?, vendorName = ? ,vendorFullAddress = ? ,date = ? WHERE id = ?",
    [grn.status, grn.invoiceNumber, grn.vendorName,grn.vendorFullAddress,grn.date, id],
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

GRNS.remove = (id, result) => {
  sql.query("DELETE FROM grn WHERE id = ?", id, (err, res) => {
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

GRNS.removeAll = result => {
  sql.query("DELETE FROM grn", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} grn`);
    result(null, res);
  });
};

module.exports = GRNS;
