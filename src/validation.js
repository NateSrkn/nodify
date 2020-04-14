const Joi = require('@hapi/joi')

// Register User
const userValidation = (body) => {
  const schema = Joi.object({
    name: Joi
      .string()
      .required()
      .pattern(new RegExp("^[^±!@£$%^&*_+§¡€#¢§¶•ªº«\\\/<>?:;|=.,]{1,20}$")),
    email: Joi.string().required().email(),
    password: Joi.string().required().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
  })

  return schema.validate(body)
}

const loginValidation = (body) => {
  const schema = Joi.object({
    email: Joi.string().required().email(),
    password: Joi.string().required().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
  })

  return schema.validate(body)
}


module.exports = {
  userValidation,
  loginValidation
}