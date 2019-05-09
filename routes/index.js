const express = require("express");
const router = express.Router();
const Admin = require("../models/admin");
const config = require("../config");
const common_helper = require("../helpers/common");

/* GET home page. */
router.get("/", async function (req, res, next) {
	res.render("index", { title: "DGSM" });
});


router.post("/admin/login", async function (req, res) {
	try {
		var responseData = await common_helper.findOne(Admin, {
			email: req.body.email,
			password: req.body.password
		});

		if (responseData.status === 1 && responseData.data !== null) {
			delete responseData.data.password;
			responseData.data.role = "admin";

			var token = await common_helper.sign(responseData.data);
			responseData.data.token = token;
			responseData.message = "Login Success";
			res.status(config.OK_STATUS).json(responseData);
		} else {
			responseData.message = "Invalid Credential";
			responseData.status = 0;
			delete responseData.data;
			res.status(config.UNAUTHORIZED).json(responseData);
		}

	}
	catch (err) {
		res.status(config.OK_STATUS).json({
			status: 0,
			message: "Invalid Argument"
		});

	}

});

module.exports = router;
