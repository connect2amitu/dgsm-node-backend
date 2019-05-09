const { check } = require('express-validator/check');

module.exports = {
        sub_category: [
                check('name')
                        .trim()
                        .not().isEmpty().withMessage('Name is required')
                        .exists().withMessage('Name is required')
                        .isLength({ min: 2, max: 100 }).withMessage('Name should be between 2 to 100 characters long'),
                check('categoryId')
                        .trim()
                        .not().isEmpty().withMessage('Category is required')
                        .exists().withMessage('Category is required'),
        ]
};