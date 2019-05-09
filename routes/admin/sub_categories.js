const express = require("express");
const router = express.Router();
const common_helper = require("../../helpers/common");
const SubCategory = require("../../models/sub_categories");
const config = require("../../config");
const sub_category = require('../../validators/sub_category');
const validation_response = require('../../validators/validation_response');

router.get("/", async (req, res) => {
  let responseData = await common_helper.find(SubCategory);
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
  let responseData = await common_helper.findOne(SubCategory, condition);
  if (responseData.status === 1) {
    res.status(config.OK_STATUS).json(responseData);
  } else {
    res.status(config.DATABASE_ERROR_STATUS).json(responseData);
  }
});

router.post("/", sub_category.sub_category, validation_response, async (req, res) => {
  let saveData = {
    name: req.body.name,
    categoryId: req.body.categoryId,
  };
  let responseData = await common_helper.insert(SubCategory, saveData);
  if (responseData.status === 1) {
    res.status(config.OK_STATUS).json(responseData);
  } else {
    res.status(config.DATABASE_ERROR_STATUS).json(responseData);
  }
});

router.put("/:id", sub_category.sub_category, validation_response, async (req, res) => {
  let updateData = {
    name: req.body.name,
    categoryId: req.body.categoryId,
    modifiedAt: Date.now()
  };
  let condition = {
    _id: req.params.id
  };
  let responseData = await common_helper.update(SubCategory, condition, updateData);

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

  let responseData = await common_helper.delete(SubCategory, condition);
  if (responseData.status === 1) {
    res.status(config.OK_STATUS).json(responseData);
  } else {
    res.status(config.DATABASE_ERROR_STATUS).json(responseData);
  }
});

module.exports = router;
