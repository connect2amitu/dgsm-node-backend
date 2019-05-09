const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");

const track = require("./admin/tracks");
const video = require("./admin/videos");
const image = require("./admin/images");
const quote = require("./admin/quotes");
const categories = require("./admin/categories");
const sub_categories = require("./admin/sub_categories");
const albums = require("./admin/albums");

router.use("/track", auth, track);
router.use("/video", auth, video);
router.use("/image", auth, image);
router.use("/quote", auth, quote);
router.use("/category", auth, categories);
router.use("/sub_category", auth, sub_categories);
router.use("/album", auth, albums);

module.exports = router;
