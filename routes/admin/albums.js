const express = require("express");
const router = express.Router();
const common_helper = require("../../helpers/common");
const album_helper = require("../../helpers/album");
const Album = require("../../models/albums");
const config = require("../../config");
const album = require('../../validators/album');
const validation_response = require('../../validators/validation_response');



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
  let responseData = await common_helper.find(Album);

  if (responseData.status === 1) {
    res.status(config.OK_STATUS).json(responseData);
  } else {
    res.status(config.DATABASE_ERROR_STATUS).json(responseData);
  }
});

router.get("/:id", async (req, res) => {
  let condition = {
    _id: req.params.id
  };
  let responseData = await common_helper.findOne(Album, condition);
  if (responseData.status === 1) {
    res.status(config.OK_STATUS).json(responseData);
  } else {
    res.status(config.DATABASE_ERROR_STATUS).json(responseData);
  }
});

router.post("/", album.album, validation_response, async (req, res) => {
  let saveData = {
    name: req.body.name,
    language: req.body.language,
    type: req.body.type,
    slug: common_helper.slugify(req.body.name)
  };

  try {
    let image = await common_helper.upload(req.files['cover'], "uploads/albums", "image");
    if (image.status === 1 && image.data.length > 0) {
      saveData.cover = image.data[0].path;
    }
    let responseData = await common_helper.insert(Album, saveData);
    if (responseData.status === 1) {
      res.status(config.OK_STATUS).json(responseData);
    } else {
      res.status(config.DATABASE_ERROR_STATUS).json(responseData);
    }

  } catch (error) {
    console.log('error  => ', error);
  }


});

router.put("/:id", album.album, validation_response, async (req, res) => {
  let updateData = {
    name: req.body.name,
    type: req.body.type,
    language: req.body.language,
    slug: funs.slugify(req.body.name),
    modifiedAt: Date.now()
  };
  let condition = {
    _id: req.params.id
  };

  let responseData = await common_helper.update(Album, condition, updateData);
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
  let responseData = await common_helper.delete(Album, condition);
  if (responseData.status === 1) {
    res.status(config.OK_STATUS).json(responseData);
  } else {
    res.status(config.DATABASE_ERROR_STATUS).json(responseData);
  }
});

module.exports = router;
