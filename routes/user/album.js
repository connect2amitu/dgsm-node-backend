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
  let condition = {};

  if (req.query.language) {
    condition.language = req.query.language;
  }
  if (req.query.search) {
    condition.name = new RegExp("/^" + req.query.search + "/i");
  }

  let responseData = await common_helper.find(Album, condition);
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
