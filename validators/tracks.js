const { check } = require('express-validator/check');

module.exports = {
        tracks: [
                check('title')
                        .trim()
                        .not().isEmpty().withMessage('Title is required')
                        .exists().withMessage('First name is required')
                        .isLength({ min: 2, max: 100 }).withMessage('Title should be between 2 to 100 characters long'),
                check('categoryId')
                        .trim()
                        .not().isEmpty().withMessage('Category is required')
                        .exists().withMessage('Category is required'),
                check('albumId')
                        .trim()
                        .not().isEmpty().withMessage('Album is required')
                        .exists().withMessage('Album is required'),
                check('type')
                        .trim()
                        .not().isEmpty().withMessage('Type is required')
                        .exists().withMessage('Type is required')
        ]
};