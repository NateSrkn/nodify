import Joi from '@hapi/joi'

export const updateUserValidation = (body) => {
  const schema = Joi.object({
    name: Joi.string().regex(/^[^±!@£$%^&*_+§¡€#¢§¶•ªº«\\/<>?:;|=.,]{1,20}$/),
    username: Joi.string().regex(/^\S*$/),
    email: Joi.string().email(),
    password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/)
  })
  return schema.validate(body)
}