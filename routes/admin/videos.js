const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const common_helper = require("../../helpers/common");
const video_helper = require("../../helpers/video");
const Video = require("../../models/videos");
const Category = require("../../models/categories");
const VideosUrls = require("../../models/videos_urls");
const config = require("../../config");
const video = require('../../validators/video');
const validation_response = require('../../validators/validation_response');
const constant = require("../../constants");

router.get("/", async (req, res) => {
  // let responseData = await common_helper.find(Video);
  let responseData = await video_helper.getVideosData();
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

  let responseData = await video_helper.getVideosData(condition, 1);

  if (responseData.status === 1) {
    res.status(config.OK_STATUS).json(responseData);
  } else {
    res.status(config.DATABASE_ERROR_STATUS).json(responseData);
  }
});

router.post("/", video.video, validation_response, async (req, res) => {

  let saveData = {
    title: req.body.title,
    categoryId: req.body.categoryId,
    albumId: req.body.albumId,
  };

  let albumName = await common_helper.findOne(Category, condition = { _id: req.body.categoryId });
  let folderName = "uploads/videos/";

  if (albumName.status === 1 && albumName.data !== null) {
    folderName += "/" + albumName.data.name;
  }

  let uploadPromise = await common_helper.upload(req.files['video'], folderName, filename = "");
  let responseData = await common_helper.insert(Video, saveData);
  if (responseData.status === 1) {
    let videoId = responseData.data._id;
    let saveURLs = [];
    uploadPromise.data.forEach(url => {
      saveURLs.push({
        url,
        videoId
      })
    });
    let videoURLData = await common_helper.insertMany(VideosUrls, saveURLs);
    if (videoURLData.status === 1) {
      res.status(config.OK_STATUS).json(responseData);
    } else {
      res.status(config.DATABASE_ERROR_STATUS).json(responseData);
    }
  } else {
    res.status(config.DATABASE_ERROR_STATUS).json(responseData);
  }
});

router.put("/:id", video.video, validation_response, async (req, res) => {
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

  let condition = {
    _id: req.params.id
  };

  let responseData = await common_helper.update(Video, condition, updateData);
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
  let responseData = await common_helper.delete(Video, condition);
  if (responseData.status === 1) {
    res.status(config.OK_STATUS).json(responseData);
  } else {
    res.status(config.DATABASE_ERROR_STATUS).json(responseData);
  }
});

module.exports = router;
