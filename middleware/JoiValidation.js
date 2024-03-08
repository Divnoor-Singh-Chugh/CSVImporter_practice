const Joi = require("joi");

const JoiValidation = (req, res, next) => {
  const { email, password } = req.body;

  const manager = { email, password };
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(4).required(),
  });
  const { error } = schema.validate(manager);
  if(error)
  {
    console.log(error);
    return res.send(error.details[0].message);
  }
  next();
};

module.exports = JoiValidation;
