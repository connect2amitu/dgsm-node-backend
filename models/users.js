const collectionName = "users";

const collectionSchema = {
  name: { type: String, require: true },
  age: { type: String },
  about: { type: String },
  isDeleted: { type: Number,default:0 },
  createdAt: { type: Date, default: Date.now },
  modifiedAt: { type: Date, default: Date.now }
};

module.exports = require("./index")(collectionSchema, collectionName);
