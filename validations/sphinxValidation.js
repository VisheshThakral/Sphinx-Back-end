const Joi = require("joi");

const validator = (schema) => (payload) =>
  schema.validate(payload, { abortEarly: false });

const sphinxSchema = Joi.object({
  createdAt: Joi.date().greater("2010-01-01").required(),
  name: Joi.string().min(3).max(10).required(),
  content: Joi.string().min(10).max(200).required(),
  userName: Joi.string().min(3).max(20).required(),
  likes: Joi.number().required(),
  repost: Joi.number().required(),
  authImg: Joi.string().uri().required(),
  comments: Joi.number().required(),
  views: Joi.number().required(),
});

exports.sphinxSchema = validator(sphinxSchema);

