const express = require("express");
const router = express.Router();
const common_helper = require("../../helpers/common");
const category_helper = require("../../helpers/category");
const Category = require("../../models/categories");
const config = require("../../config");
const constants = require("../../constants");
const category = require('../../validators/category');
const validation_response = require('../../validators/validation_response');

router.post("/filter", async (req, res) => {
  let filterObject = common_helper.changeObject(req.body);
  let responseData = await category_helper.getFilteredRecords(
    filterObject
  );

  if (responseData.status === 1) {
    res.status(config.OK_STATUS).json(responseData);
  } else {
    res.status(config.DATABASE_ERROR_STATUS).json(responseData);
  }
});


router.get("/", async (req, res) => {
  let responseData = await common_helper.find(Category);
  if (responseData.status === 1) {
    res.status(config.OK_STATUS).json(responseData);
  } else {
    res.status(config.DATABASE_ERROR_STATUS).json(responseData);
  }
});

router.get("/:id", async (req, res) => {
  let condition = {
    _id: req.params.id
  };
  let responseData = await common_helper.findOne(Category, condition);
  if (responseData.status === 1) {
    res.status(config.OK_STATUS).json(responseData);
  } else {
    res.status(config.DATABASE_ERROR_STATUS).json(responseData);
  }
});

router.post("/", category.category, validation_response, async (req, res) => {
  let saveData = {
    name: req.body.name,
    slug: common_helper.slugify(req.body.name),
  };

  let responseData = await common_helper.find(Category, { slug: saveData.slug });

  if (responseData.status === 1 && responseData.data.length > 0) {
    responseData.status = 0;
    responseData.message = ` ${saveData.slug} category already exists`;
    return res.status(config.OK_STATUS).json(responseData);
  }
  let folderName = "uploads/category/";

  try {
    let uploadPromise = await common_helper.upload(req.files['cover'], folderName, "image");
    if (uploadPromise.data.length > 0) {
      saveData.cover = uploadPromise.data[0].path;
    }
  } catch (error) {
    // res.status(config.INTERNAL_SERVER_ERROR).json(uploadPromise);
  }

  responseData = await common_helper.insert(Category, saveData);
  if (responseData.status === 1) {
    res.status(config.OK_STATUS).json(responseData);
  } else {
    res.status(config.DATABASE_ERROR_STATUS).json(responseData);
  }
});

router.put("/:id", category.category, validation_response, async (req, res) => {
  let updateData = {
    name: req.body.name,
    slug: common_helper.slugify(req.body.name),
    modifiedAt: Date.now()
  };
  let condition = {
    _id: req.params.id
  };
  let responseData = await common_helper.find(Category, { slug: updateData.slug, _id: { $ne: constants.OBJECT_ID(req.params.id) } });

  if (responseData.status === 1 && responseData.data.length > 0) {
    responseData.status = 0;
    responseData.message = ` ${updateData.slug} category already exists`;
    return res.status(config.OK_STATUS).json(responseData);
  }
  let folderName = "uploads/category/";

  try {
    let uploadPromise = await common_helper.upload(req.files['cover'], folderName, "image");
    if (uploadPromise.data.length > 0) {
      updateData.cover = uploadPromise.data[0].path;
    }
  } catch (error) {
    // res.status(config.INTERNAL_SERVER_ERROR).json(uploadPromise);
  }

  responseData = await common_helper.update(Category, condition, updateData);
  if (responseData.status === 1) {
    res.status(config.OK_STATUS).json(responseData);
  } else {
    res.status(config.DATABASE_ERROR_STATUS).json(responseData);
  }
});

router.delete("/:id", async (req, res) => {
  let condition = {
    _id: req.params.id
  };

  let responseData = await common_helper.findOne(Category, condition);
  if (responseData.status === 1) {

    await common_helper.removeFileFromServer(responseData.data.cover);
    responseData = await common_helper.delete(Category, condition);

    if (responseData.status === 1) {
      res.status(config.OK_STATUS).json(responseData);
    } else {
      res.status(config.DATABASE_ERROR_STATUS).json(responseData);
    }

  } else {
    res.status(config.DATABASE_ERROR_STATUS).json(responseData);
  }


});

module.exports = router;
