import Joi from '@hapi/joi'

// Register User
export const userValidation = (body) => {
  const schema = Joi.object({
    name: Joi
      .string()
      .required()
      .pattern(new RegExp("^[^±!@£$%^&*_+§¡€#¢§¶•ªº«\\/<>?:;|=.,]{1,20}$")),
    username: Joi.string().required(),
    email: Joi.string().required().email(),
    password: Joi.string().required().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
  })

  return schema.validate(body)
}

export const updateUserValidation = body => {
  const schema = Joi.object({
    name: Joi
      .string()
      .pattern(new RegExp("^[^±!@£$%^&*_+§¡€#¢§¶•ªº«\\/<>?:;|=.,]{1,20}$")),
    username: Joi.string(),
    email: Joi.string().email(),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
  })

  return schema.validate(body)
}

export const loginValidation = (body) => {
  const schema = Joi.object({
    email: Joi.string().required().email(),
    password: Joi.string().required().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
  })

  return schema.validate(body)
}

export const topicValidation = (body) => {
  const schema = Joi.object({
    title: Joi.string().required().pattern(new RegExp("(\\s)")),
    description: Joi.string(),
    
  })

  return schema.validate(body)
}
