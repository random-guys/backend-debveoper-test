import Joi from '@hapi/joi';
import Schemas from './schema/bodySchema';

const bodyValidation = (req, res, next) => {
  const supportedMethods = ['post', 'put', 'patch'];

  const validationOptions = {
    abortEarly: false,
    allowUnknown: true,
    stripUnknown: true,
  };

  const route = req.route.path;
  const method = req.method.toLowerCase();

  if (supportedMethods.includes(method) && route in Schemas) {

    const schema = Schemas[route];
    if (schema) {
      return Joi.validate(req.body, schema, validationOptions, (err, data) => {
        if (err) {
          const SimplifiedError = {
            status: 400,
            error: err.details
              ? err.details[0].message.replace(/['"]/g, '')
              : err.message,
          };
          return res.status(400).json(SimplifiedError);
        }
        req.body = data;
        return next();
      });
    }
  }
  return next();
};

export default bodyValidation;
