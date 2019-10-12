const express = require("express");
const router = express.Router();


const album = require("./user/album");
const bhajan = require("./user/bhajan");
const sub_category = require("./user/sub_category");
const playlist = require("./user/playlist");

router.use("/album", album);
router.use("/bhajan", bhajan);
router.use("/sub_category", sub_category);
router.use("/playlist", playlist);


module.exports = router;
