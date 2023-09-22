import * as Joi from 'Joi';

const currentYear = new Date().getFullYear()

const schema = Joi.object({
    card_number: 
      Joi.string().creditCard()
    ,
    cvv: [
        Joi.string()
        .min(3).max(4),
        Joi.number().min(100).max(9999)
    ],
    expiration_year: Joi.number()
        .integer()
        .min(currentYear)
        .max(currentYear + 5),
    expiration_month: Joi.number()
        .integer()
        .min(1)
        .max(12),
    email: Joi.string()
        .min(5).max(100)
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'es'] } })
})

export const validateFields = (form) => {
  return schema.validate(JSON.parse(form)) 
}