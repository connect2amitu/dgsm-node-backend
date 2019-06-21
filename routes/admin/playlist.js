const express = require("express");
const router = express.Router();
const playlist_helper = require("../../helpers/playlist");
const config = require("../../config");
const constants = require("../../constants");


router.get("/:id", async (req, res) => {
  let condition = {
    _id: constants.OBJECT_ID(req.params.id)
  };

  let responseData = await playlist_helper.getPlayList(condition);

  if (responseData.status === 1) {
    res.status(config.OK_STATUS).json(responseData);
  } else {
    res.status(config.DATABASE_ERROR_STATUS).json(responseData);
  }
});




module.exports = router;
