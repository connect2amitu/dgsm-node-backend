const constant = require("../constants");
const collectionName = "tracks_urls";

const collectionSchema = {
  url: { type: String, require: true },
  albumId: { type: constant.OBJECT_ID, ref: "albums", default: null },
  categoryId: { type: constant.OBJECT_ID, ref: "categories", default: null },
  trackName: { type: String, default: null },
  isDeleted: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  modifiedAt: { type: Date, default: Date.now }
};

module.exports = require("./index")(collectionSchema, collectionName);
