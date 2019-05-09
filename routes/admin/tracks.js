const express = require("express");
const router = express.Router();
const fs = require("fs");
const constant = require("../../constants");
const common_helper = require("../../helpers/common");
const track_helper = require("../../helpers/track");
const Track = require("../../models/tracks");
const TracksUrls = require("../../models/tracks_urls");
const Category = require("../../models/categories");
const config = require("../../config");
const tracks = require('../../validators/tracks');
const validation_response = require('../../validators/validation_response');


router.post("/filter", async (req, res) => {
  let filterObject = common_helper.changeObject(req.body);
  let responseData = await track_helper.getFilteredRecords(
    filterObject
  );

  if (responseData.status === 1) {
    res.status(config.OK_STATUS).json(responseData);
  } else {
    res.status(config.DATABASE_ERROR_STATUS).json(responseData);
  }
});


router.get("/", async (req, res) => {
  let responseData = await track_helper.getTracksData();

  if (responseData.status === 1) {
    res.status(config.OK_STATUS).json(responseData);
  } else {
    res.status(config.DATABASE_ERROR_STATUS).json(responseData);
  }

});

router.get("/:id", async (req, res) => {
  let condition = {
    _id: constant.OBJECT_ID(req.params.id)
  };
  let responseData = await track_helper.getTracksData(condition, 1);

  if (responseData.status === 1) {
    res.status(config.OK_STATUS).json(responseData);
  } else {
    res.status(config.DATABASE_ERROR_STATUS).json(responseData);
  }

});

router.post("/", tracks.tracks, validation_response, async (req, res) => {
  let saveData = {
    title: req.body.title,
    categoryId: req.body.categoryId,
    albumId: req.body.albumId,
    type: req.body.type,
  };

  let albumName = await common_helper.findOne(Category, condition = { _id: req.body.categoryId });
  let folderName = "uploads/tracks/" + req.body.type;

  if (albumName.status === 1) {
    folderName += "/" + albumName.data.name;
  }

  let uploadPromise = await common_helper.upload(req.files['track'], folderName, "audio");
  let responseData = await common_helper.insert(Track, saveData);

  if (responseData.status === 1) {
    let trackId = responseData.data._id;
    let saveURLs = [];
    uploadPromise.data.forEach(uploaded => {
      saveURLs.push({
        trackName: uploaded.name,
        url: uploaded.path,
        trackId
      })
    });

    let trackURLData = await common_helper.insertMany(TracksUrls, saveURLs);

    if (trackURLData.status === 1) {
      res.status(config.OK_STATUS).json(responseData);
    } else {
      res.status(config.DATABASE_ERROR_STATUS).json(responseData);
    }
  } else {
    res.status(config.DATABASE_ERROR_STATUS).json(responseData);
  }
});

router.put("/:id", tracks.tracks, validation_response, async (req, res) => {
  let updateData = {};

  if (req.body.title) {
    updateData.title = req.body.title;
  }
  if (req.body.categoryId) {
    updateData.categoryId = req.body.categoryId;
  }
  if (req.body.albumId) {
    updateData.albumId = req.body.albumId;
  }
  if (req.body.type) {
    updateData.type = req.body.type;
  }

  let condition = {
    _id: req.params.id
  };

  let responseData = await common_helper.update(Track, condition, updateData);

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
  let responseData = await common_helper.delete(Track, condition);

  if (responseData.status === 1) {
    let condition = {
      trackId: constant.OBJECT_ID(req.params.id)
    }
    await common_helper.delete(TracksUrls, condition);
    res.status(config.OK_STATUS).json(responseData);
  } else {
    res.status(config.DATABASE_ERROR_STATUS).json(responseData);
  }

});

module.exports = router;
