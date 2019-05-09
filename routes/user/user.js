const express = require("express");
const router = express.Router();
const common_helper = require("../../helpers/common");
const Users = require("../../models/users");
const config = require("../../config");


router.get("/", async (req, res) => {
    let responseData = await common_helper.find(Users);
    console.info('------------------------------------');
    console.info('responseData => ', responseData);
    console.info('------------------------------------');
    
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
    let responseData = await common_helper.findOne(Users, condition);
    if (responseData.status === 1) {
        res.status(config.OK_STATUS).json(responseData);
    } else {
        res.status(config.DATABASE_ERROR_STATUS).json(responseData);
    }
});

router.post("/", async (req, res) => {
    let saveData = {
        name: req.body.name,
        age: req.body.age,
        about: req.body.about,
    };
    let responseData = await common_helper.insert(Users, saveData);
    if (responseData.status === 1) {
        res.status(config.OK_STATUS).json(responseData);
    } else {
        res.status(config.DATABASE_ERROR_STATUS).json(responseData);
    }
});

router.put("/:id", async (req, res) => {
    let updateData = {
        name: req.body.name,
        age: req.body.age,
        about: req.body.about,
        modifiedAt: Date.now()
    };
    let condition = {
        _id: req.params.id
    };
    let responseData = await common_helper.update(Users, condition, updateData);
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
    let responseData = await common_helper.delete(Users, condition);
    if (responseData.status === 1) {
        res.status(config.OK_STATUS).json(responseData);
    } else {
        res.status(config.DATABASE_ERROR_STATUS).json(responseData);
    }
});

module.exports = router;
