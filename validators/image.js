const { check } = require('express-validator/check');

module.exports = {
        image: [
                check('title')
                        .trim()
                        .not().isEmpty().withMessage('Title is required')
                        .exists().withMessage('Title is required')
                        .isLength({ min: 2, max: 200 }).withMessage('Title should be between 2 to 200 characters long'),
                check('categoryId')
                        .trim()
                        .not().isEmpty().withMessage('Category is required')
                        .exists().withMessage('Category is required'),
                check('albumId')
                        .trim()
                        .not().isEmpty().withMessage('Album is required')
                        .exists().withMessage('Album is required'),
        ]
};