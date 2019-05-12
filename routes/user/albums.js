const express = require("express");
const router = express.Router();
const common_helper = require("../../helpers/common");
const album_helper = require("../../helpers/album");
const Album = require("../../models/albums");
const config = require("../../config");

router.post("/filter", async (req, res) => {
  let filterObject = common_helper.changeObject(req.body);
  let responseData = await album_helper.getFilteredRecords(
    filterObject
  );

  if (responseData.status === 1) {
    res.status(config.OK_STATUS).json(responseData);
  } else {
    res.status(config.DATABASE_ERROR_STATUS).json(responseData);
  }
});


router.get("/", async (req, res) => {
  console.log('1  => ', 1);

  let condition = {};

  if (req.query.lang) {
    condition.language = req.query.lang;
  }

  let responseData = await common_helper.find(Album, condition);
  console.log('responseData  => ', responseData);

  if (responseData.status === 1) {
    res.status(config.OK_STATUS).json(responseData);
  } else {
    res.status(config.DATABASE_ERROR_STATUS).json(responseData);
  }
});

router.get("/:slug", async (req, res) => {
  let condition = {
    slug: req.params.slug
  };
  let responseData = await common_helper.findOne(Album, condition);

  if (responseData.status === 1) {
    res.status(config.OK_STATUS).json(responseData);
  } else {
    res.status(config.DATABASE_ERROR_STATUS).json(responseData);
  }
});


module.exports = router;
