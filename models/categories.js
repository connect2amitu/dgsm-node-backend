const collectionName = "categories";

const collectionSchema = {
  name: { type: String, require: true },
  cover: { type: String },
  type: { type: String, default: "other" },
  slug: { type: String },
  isDeleted: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  modifiedAt: { type: Date, default: Date.now }
};

module.exports = require("./index")(collectionSchema, collectionName);
