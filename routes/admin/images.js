const express = require("express");
const router = express.Router();
const common_helper = require("../../helpers/common");
const image_helper = require("../../helpers/image");

const Image = require("../../models/images");
const ImagesUrls = require("../../models/images_urls");
const Category = require("../../models/categories");

const config = require("../../config");
const constant = require("../../constants");

const image = require('../../validators/image');
const validation_response = require('../../validators/validation_response');



router.post("/filter", async (req, res) => {
  let filterObject = common_helper.changeObject(req.body);
  let responseData = await image_helper.getFilteredRecords(
    filterObject
  );

  if (responseData.status === 1) {
    res.status(config.OK_STATUS).json(responseData);
  } else {
    res.status(config.DATABASE_ERROR_STATUS).json(responseData);
  }
});


router.get("/", async (req, res) => {
  // let responseData = await common_helper.find(Image);
  let responseData = await image_helper.getImagesData();
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
  let responseData = await image_helper.getImagesData(condition, 1);
  if (responseData.status === 1) {
    res.status(config.OK_STATUS).json(responseData);
  } else {
    res.status(config.DATABASE_ERROR_STATUS).json(responseData);
  }
});

router.post("/", image.image, validation_response, async (req, res) => {

  let saveData = {
    title: req.body.title,
    categoryId: req.body.categoryId,
    albumId: req.body.albumId,
  };


  let albumName = await common_helper.findOne(Category, condition = { _id: req.body.categoryId });
  let folderName = "uploads/images/";

  if (albumName.status === 1) {
    folderName += albumName.data.name;
  }

  let uploadPromise = await common_helper.upload(req.files['image'], folderName, "image");
  let responseData = await common_helper.insert(Image, saveData);

  if (responseData.status === 1) {

    let imageId = responseData.data._id;
    let saveURLs = [];

    uploadPromise.data.forEach(uploaded => {
      saveURLs.push({
        imageName: uploaded.name,
        url: uploaded.path,
        imageId
      })
    });

    let trackURLData = await common_helper.insertMany(ImagesUrls, saveURLs);

    if (trackURLData.status === 1) {
      res.status(config.OK_STATUS).json(responseData);
    } else {
      res.status(config.DATABASE_ERROR_STATUS).json(responseData);
    }

  } else {
    res.status(config.DATABASE_ERROR_STATUS).json(responseData);
  }
});

router.put("/:id", image.image, validation_response, async (req, res) => {
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

  let responseData = await common_helper.update(Image, condition, updateData);
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
  let responseData = await common_helper.delete(Image, condition);
  if (responseData.status === 1) {
    res.status(config.OK_STATUS).json(responseData);
  } else {
    res.status(config.DATABASE_ERROR_STATUS).json(responseData);
  }
});

module.exports = router;
