const mongoose = require("mongoose");
const versionKey = {
  versionKey: false
};

module.exports = function (SchemaObject, collectionName) {
  return mongoose.model(
    collectionName,
    new mongoose.Schema(SchemaObject, versionKey),
    collectionName
  );
};
