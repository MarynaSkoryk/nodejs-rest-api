const { Schema, model } = require('mongoose');
const Joi = require('joi');

const { handleMongooseError } = require('../helpers');

const emailRegExp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const userSchema = new Schema(
  {
    password: {
      type: String,
      required: [true, 'Set password for user'],
    },
    email: {
      type: String,
      match: emailRegExp,
      required: [true, 'Email is required'],
      unique: true,
    },

    subscription: {
      type: String,
      enum: ['starter', 'pro', 'business'],
      default: 'starter',
    },
    token: { type: String, default: '' },
    avatarURL: { type: String, required: true },

    verify: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      required: [true, 'Verify token is required'],
    },
  },
  { versionKey: false }
);

userSchema.post('save', handleMongooseError);

const schemaRegister = Joi.object({
  email: Joi.string().pattern(emailRegExp).required(),
  password: Joi.string().min(4).required(),
});

const schemaEmail = Joi.object({
  email: Joi.string().pattern(emailRegExp).required().messages({
    'any.required': `missing required field email`,
  }),
});

const schemaLogin = Joi.object({
  email: Joi.string().pattern(emailRegExp).required().messages({
    'any.required': `missing required field email`,
  }),
  password: Joi.string().min(4).required(),
});

const subscriptionValues = ['starter', 'pro', 'business'];

const schemaUpdateSubscription = Joi.object({
  subscription: Joi.string()
    .valid(...subscriptionValues)
    .required(),
});

const User = model('user', userSchema);

module.exports = {
  User,
  schemaRegister,
  schemaEmail,
  schemaLogin,
  schemaUpdateSubscription,
};
