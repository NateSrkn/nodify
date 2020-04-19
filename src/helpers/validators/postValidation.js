import Joi from '@hapi/joi'

// Register User
export const userValidation = (body) => {
  const schema = Joi.object({
    name: Joi.string().regex(/^[^±!@£$%^&*_+§¡€#¢§¶•ªº«\\/<>?:;|=.,]{1,20}$/).required(),
    username: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required()
  })
  return schema.validate(body)
}

export const loginValidation = (body) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required()
  })

  return schema.validate(body)
}

export const topicValidation = (body) => {
  const schema = Joi.object({
    title: Joi.string().regex(/^\S*$/).required(),
    description: Joi.string()
  })
  return schema.validate(body)
}

export const postValidation = (body) => {
  const schema = Joi.object({
    title: Joi.string().required(),
    body: Joi.string()
  })
  return schema.validate(body)
}

export const commentValidation = (body) => {
  const schema = Joi.Joi({
    message: Joi.string().required()
  })
  return schema.validate(body)
}