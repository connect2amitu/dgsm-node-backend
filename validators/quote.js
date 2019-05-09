const { check } = require('express-validator/check');

module.exports = {
        quote: [
                check('quote')
                        .trim()
                        .not().isEmpty().withMessage('Quote is required')
                        .exists().withMessage('Quote is required')
                        .isLength({ min: 2, max: 200 }).withMessage('Quote should be between 2 to 200 characters long'),
                check('categoryId')
                        .trim()
                        .not().isEmpty().withMessage('Category is required')
                        .exists().withMessage('Category is required'),
        ]
};