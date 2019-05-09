const constant = require("../constants");
const collectionName = "sub_categories";

const collectionSchema = {
  name: { type: String, require: true },
  categoryId: { type: constant.OBJECT_ID, ref: "categories", default: null },
  isDeleted: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  modifiedAt: { type: Date, default: Date.now }
};

module.exports = require("./index")(collectionSchema, collectionName);
