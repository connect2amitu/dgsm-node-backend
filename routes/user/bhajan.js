const express = require("express");
const router = express.Router();
const common_helper = require("../../helpers/common");
const bhajan_helper = require("../../helpers/bhajan");
const Category = require("../../models/categories");
const SubCategory = require("../../models/sub_categories");
const config = require("../../config");


router.get("/", async (req, res) => {
  let responseData = await common_helper.find(Category);

  if (responseData.status === 1) {
    res.status(config.OK_STATUS).json(responseData);
  } else {
    res.status(config.DATABASE_ERROR_STATUS).json(responseData);
  }
});

router.get("/:category/:subCategory", async (req, res) => {
  const categoryData = await common_helper.findOne(Category, { slug: req.params.category });
  const subCategoryData = await common_helper.findOne(SubCategory, { slug: req.params.subCategory });

  if (categoryData.status == 1 && subCategoryData.status == 1) {
    const condition = {
      categoryId: categoryData.data._id,
      subCategoryId: subCategoryData.data._id
    }
    const responseData = await bhajan_helper.getCitiesBhajan(condition);
    if (responseData.status === 1) {
      res.status(config.OK_STATUS).json(responseData);
    } else {
      res.status(config.DATABASE_ERROR_STATUS).json(responseData);
    }
  } else {
    res.status(config.DATABASE_ERROR_STATUS).json(categoryData);
  }
});

router.get("/:slug", async (req, res) => {
  var condition = {
    slug: req.params.slug
  }
  let responseData = await bhajan_helper.getCategoryTracks(condition);
  if (responseData.status === 1) {
    res.status(config.OK_STATUS).json(responseData);
  } else {
    res.status(config.DATABASE_ERROR_STATUS).json(responseData);
  }
});


module.exports = router;
