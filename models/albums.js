const collectionName = "albums";
const constants = require('../constants');
const collectionSchema = {
  name: { type: String, require: true },
  slug: { type: String, require: true },
  language: { type: String, require: true, enum: constants.LANGUAGES },
  cover: { type: String, require: false },
  isDeleted: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  modifiedAt: { type: Date, default: Date.now }
};

module.exports = require("./index")(collectionSchema, collectionName);
