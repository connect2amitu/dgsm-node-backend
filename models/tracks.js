const constant = require("../constants");
const collectionName = "tracks";

const collectionSchema = {
  title: { type: String, require: true },
  audioPathId: { type: constant.OBJECT_ID, ref: "tracks_path", require: true },
  categoryId: { type: constant.OBJECT_ID, ref: "categories", default: null },
  albumId: { type: constant.OBJECT_ID, ref: "albums", default: null },
  type: { type: String, enum: constant.AUDIO_TYPES, default: "vani" },
  isDeleted: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  modifiedAt: { type: Date, default: Date.now }
};

module.exports = require("./index")(collectionSchema, collectionName);
