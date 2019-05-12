const express = require("express");
const router = express.Router();
const common_helper = require("../../helpers/common");
const playlist_helper = require("../../helpers/playlist");
const config = require("../../config");


router.get("/:slug", async (req, res) => {
  let condition = {
    slug: req.params.slug
  };
  console.log('condition  => ', condition);

  let responseData = await playlist_helper.getPlayList(condition);

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
