const { body, param } = require('express-validator');

exports.validateEvent = [
  param('id')
    .isMongoId().withMessage('Invalid event ID'),
  body('name')
    .if((value, { req }) => req.body.name)
    .notEmpty().withMessage('Title is required')
    .isLength({ max: 50, min: 3 }).withMessage('Title must be less than 50 characters'),
  body('startDate')
    .if((value, { req }) => req.body.startDate)
    .notEmpty().withMessage('Start date is required')
    .isISO8601().withMessage('Start date must be in ISO8601 format'),
  body('endDate')
    .if((value, { req }) => req.body.endDate)
    .notEmpty().withMessage('End date is required')
    .isISO8601().withMessage('End date must be in ISO8601 format'),
  body('description')
    .if((value, { req }) => req.body.description)
    .notEmpty().withMessage('Description is required')
    .isLength({ max: 500, min: 10 }).withMessage('Description must be between 10 and 500 characters'),
  body('location')
    .if((value, { req }) => req.body.location)
    .notEmpty().withMessage('Location is required')
    .isLength({ max: 50 }).withMessage('Location must be less than 50 characters')
];
