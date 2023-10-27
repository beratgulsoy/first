const mongodb = require("mongodb");

const getDb = require("../util/database").getDb;

const ObjectId = mongodb.ObjectId;

class User {
  constructor(username, email) {
    this.name = username;
    this.email = email;
  }
  save() {
    const db = getDb();
    return db
      .collection("users")
      .insertOne(this)
      .then()
      .catch((err) => console.log(err));
  }
  static findById(userId) {
    const db = getDb();
    db.collection("users").findOne({ _id: new ObjectId(prodId) });
  }
}

module.exports = User;
