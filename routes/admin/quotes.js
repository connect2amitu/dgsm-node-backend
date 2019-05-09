const express = require("express");
const router = express.Router();
const common_helper = require("../../helpers/common");
const quote_helper = require("../../helpers/quote");
const Quotes = require("../../models/quotes");
const config = require("../../config");
const constant = require("../../constants");
const quote = require('../../validators/quote');
const validation_response = require('../../validators/validation_response');

router.post("/filter", async (req, res) => {
  let filterObject = common_helper.changeObject(req.body);
  let responseData = await quote_helper.getFilteredRecords(
    filterObject
  );

  if (responseData.status === 1) {
    res.status(config.OK_STATUS).json(responseData);
  } else {
    res.status(config.DATABASE_ERROR_STATUS).json(responseData);
  }
});

router.get("/", async (req, res) => {
  let responseData = await quote_helper.getFilteredRecords({}, true);
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
  let responseData = await quote_helper.getQuotesData(condition);
  if (responseData.status === 1) {
    res.status(config.OK_STATUS).json(responseData);
  } else {
    res.status(config.DATABASE_ERROR_STATUS).json(responseData);
  }
});

router.post("/", quote.quote, validation_response, async (req, res) => {
  let saveData = {
    quote: req.body.quote,
    categoryId: req.body.categoryId
  };
  let responseData = await common_helper.insert(Quotes, saveData);
  if (responseData.status === 1) {
    res.status(config.OK_STATUS).json(responseData);
  } else {
    res.status(config.DATABASE_ERROR_STATUS).json(responseData);
  }
});

router.put("/:id", quote.quote, validation_response, async (req, res) => {
  let updateData = {
    quote: req.body.quote,
    categoryId: req.body.categoryId,
    modifiedAt: Date.now()
  };
  let condition = {
    _id: req.params.id
  };
  let responseData = await common_helper.update(Quotes, condition, updateData);
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
  let responseData = await common_helper.delete(Quotes, condition);
  if (responseData.status === 1) {
    res.status(config.OK_STATUS).json(responseData);
  } else {
    res.status(config.DATABASE_ERROR_STATUS).json(responseData);
  }
});

module.exports = router;
