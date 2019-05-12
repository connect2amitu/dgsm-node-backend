const config = require("../config");
const constant = require("../constants");
const fs = require("fs");
const common_helper = {};
const async = require("async");
const jwt = require('jsonwebtoken');
const makeDir = require('make-dir');

common_helper.sign = async (plainObject) => {
  try {
    var data = await jwt.sign(plainObject, config.SECRET_KEY, { expiresIn: config.EXPIRED_TIME })
    return data;
  } catch (error) {
    return error;
  }
};

common_helper.slugify = (string) => {
  return string
    .trim()
    .toLowerCase()
    .replace(/[^\w ]+/g, '')
    .replace(/ +/g, '-');
};

common_helper.count = async (model, condition = {}) => {
  try {
    let data = await model.countDocuments(condition);
    return { status: 1, message: "Data found", data };
  } catch (error) {
    return { status: 0, message: "No data found" };
  }
};


common_helper.insert = async (Model, newData) => {
  try {
    let document = new Model(newData);
    let data = await document.save();
    return { status: 1, message: "Data inserted", data };
  } catch (error) {
    console.log('error  => ', error);

    return { status: 0, message: "No data inserted" };
  }
};

common_helper.insertMany = async (Model, newData) => {
  try {
    let data = await Model.insertMany(newData);
    return { status: 1, message: "Data inserted", data };
  } catch (error) {
    return { status: 0, message: "No data inserted" };
  }
};

common_helper.update = async (model, condition, newData) => {
  try {
    let data = await model.findOneAndUpdate(condition, newData, { new: true });
    return { status: 1, message: "Data updated", data };
  } catch (error) {
    return { status: 0, message: "No data updated" };
  }
};

common_helper.softDelete = async (model, condition) => {
  try {
    let data = await model.findOneAndUpdate(condition, { isDeleted: 1 }, { new: true });
    return { status: 1, message: "Data deleted", data };
  } catch (error) {
    return { status: 0, message: "No data deleted" };
  }
};
common_helper.delete = async (model, condition) => {
  try {
    let data = await model.findOneAndDelete(condition);
    return { status: 1, message: "Data deleted", data };
  } catch (error) {
    return { status: 0, message: "No data deleted" };
  }
};

common_helper.find = async (model, condition = { isDeleted: 0 }) => {
  try {
    let data = await model.find(condition).lean();
    return { status: 1, message: "Data found", data };
  } catch (error) {
    return { status: 0, message: "No data found" };
  }
};

common_helper.findOne = async (model, condition = {}) => {
  try {
    let data = await model.findOne(condition).lean();
    return { status: 1, message: "Data found", data };
  } catch (error) {
    return { status: 0, message: "No data found" };
  }
};


common_helper.changeObject = function (data, callback) {
  columnFilter = {};
  columnSort = {};
  filter = [];
  //   columnFilterEqual = {};

  async.forEach(data.columnFilter, function (val, next) {
    var key = val.id;
    var value = val.value;
    if (val.isDigitFlag) {
      value = parseInt(val.value);
    } else if (!val.isEqualFlag) {
      re = new RegExp(val.value, "i");
      value = {
        $regex: re
      };
    }
    columnFilter[key] = value;
  });
  if (data.columnSort && data.columnSort.length > 0) {
    async.forEach(data.columnSort, function (val, next) {
      var key = val.id;
      var value = 1;
      if (val.desc) {
        value = -1;
      }
      columnSort[key] = value;
    });
  } else {
    columnSort["_id"] = 1;
  }

  data = {
    pageSize: data.pageSize,
    page: data.page,
    // columnFilterEqual,
    columnSort,
    columnFilter
  };
  return data;
};

// let samplePromise = await common_helper.upload(req.files['filename'], "folder_name", "file_pre_name");
common_helper.upload = async (files, dir, mimetype = "audio") => {
  var promise = new Promise(async function (resolve, reject) {
    var file_path_list = [];
    try {
      if (files) {
        await makeDir(dir);
        let _files = [].concat(files);

        async.eachSeries(_files, async (file, next) => {
          if (constant.MIME_TYPES[mimetype].indexOf(file.mimetype) >= 0) {
            if (!fs.existsSync(dir)) {
              fs.mkdirSync(dir);
            }

            var filename = "";

            try {
              filename =
                file.name.split(".")[0].replace(/\s/g, "_") + new Date().getTime() + "." + file.name.split(".").pop();
            } catch (error) {
              filename = name + new Date().getTime() + "." + file.name.split(".").pop();
            }
            file.mv(dir + "/" + filename, err => {
              if (err) {
                console.log("err", err);

              } else {
                location = dir + "/" + filename;
                file_path_list.push({
                  // name: file.name.split(".").slice(0, -1).join("."),
                  name: file.name,
                  path: location
                });
              }
            });
          } else {
            next();
          }
        }, function () {
          resolve({ status: 1, message: `file(s) uploaded`, data: file_path_list });
        });
      } else {
        reject({ status: 0, message: "No file(s) selected" });
      }
    } catch (error) {
      reject({ status: 0, message: "No file(s) selected" });
    }
  });
  return promise;
};

module.exports = common_helper;
