const express = require("express");
const router = express.Router();
const common_helper = require("../../helpers/common");
const Category = require("../../models/categories");
const SubCategory = require("../../models/sub_categories");
const config = require("../../config");


router.get("/", async (req, res) => {
  let responseData = await common_helper.find(SubCategory);
  console.info('------------------------------------');
  console.info(`responseData => `, responseData);
  console.info('------------------------------------');

  if (responseData.status === 1) {
    res.status(config.OK_STATUS).json(responseData);
  } else {
    res.status(config.DATABASE_ERROR_STATUS).json(responseData);
  }
});

router.get("/:slug", async (req, res) => {
  let categoryData = await common_helper.findOne(Category, { slug: req.params.slug });
  if (categoryData.status === 1) {
    let responseData = await common_helper.find(SubCategory, { categoryId: categoryData.data._id });
    if (responseData.status === 1) {
      res.status(config.OK_STATUS).json(responseData);
    } else {
      res.status(config.DATABASE_ERROR_STATUS).json(responseData);
    }
  } else {
    res.status(config.DATABASE_ERROR_STATUS).json(categoryData);
  }
});



module.exports = router;
