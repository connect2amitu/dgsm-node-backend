const constant = require("../constants");
const collectionName = "videos_urls";

const collectionSchema = {
  url: { type: String, require: true },
  videoId: { type: constant.OBJECT_ID, ref: "videos", default: null },
  isDeleted: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  modifiedAt: { type: Date, default: Date.now }
};

module.exports = require("./index")(collectionSchema, collectionName);
