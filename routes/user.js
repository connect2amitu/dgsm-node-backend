const express = require("express");
const router = express.Router();


const user = require("./user/user");
const album = require("./user/album");


router.use("/", user);
router.use("/album", album);


module.exports = router;
