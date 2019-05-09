const constant = require("../constants");
const collectionName = "images_urls";

const collectionSchema = {
  imageName: { type: String, require: true },
  url: { type: String, require: true },
  imageId: { type: constant.OBJECT_ID, ref: "images", default: null },
  isDeleted: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  modifiedAt: { type: Date, default: Date.now }
};

module.exports = require("./index")(collectionSchema, collectionName);
