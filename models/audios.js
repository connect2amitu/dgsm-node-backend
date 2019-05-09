const constant = require("../constants");

const collectionName = "audios";

const collectionSchema = {
  audioPath: { type: String, require: true },
  category: { type: constant.OBJECT_ID, ref: "categories", default: null },
  type: { type: String, enum: constant.AUDIO_TYPES, default: "vani" },
  isDeleted: { type: Number, default: 0 },
  createdDate: { type: Date, default: Date.now },
  modifiedDate: { type: Date, default: Date.now }
};

module.exports = require("./index")(collectionSchema, collectionName);
