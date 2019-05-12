const express = require("express");
const router = express.Router();


const album = require("./user/album");
const playlist = require("./user/playlist");

router.use("/album", album);
router.use("/playlist", playlist);


module.exports = router;
