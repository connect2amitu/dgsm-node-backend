const constant = require("../constants");
const collectionName = "videos";

const collectionSchema = {
  title: { type: String, require: true },
  categoryId: { type: constant.OBJECT_ID, ref: "categories", default: null },
  albumId: { type: constant.OBJECT_ID, ref: "albums", default: null },
  isDeleted: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  modifiedAt: { type: Date, default: Date.now }
};

module.exports = require("./index")(collectionSchema, collectionName);
