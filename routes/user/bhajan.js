const express = require("express");
const router = express.Router();
const common_helper = require("../../helpers/common");
const bhajan_helper = require("../../helpers/bhajan");
const Category = require("../../models/categories");
const config = require("../../config");


router.get("/", async (req, res) => {
  let responseData = await common_helper.find(Category);

  if (responseData.status === 1) {
    res.status(config.OK_STATUS).json(responseData);
  } else {
    res.status(config.DATABASE_ERROR_STATUS).json(responseData);
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
