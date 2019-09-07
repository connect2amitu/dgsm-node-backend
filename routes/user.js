const express = require("express");
const router = express.Router();


const album = require("./user/album");
const category = require("./user/category");
const playlist = require("./user/playlist");

router.use("/album", album);
router.use("/category", category);
router.use("/playlist", playlist);


module.exports = router;
