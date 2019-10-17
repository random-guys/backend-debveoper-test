import Joi from '@hapi/joi';

const id = Joi.string()
  .required();

const IDSchema = Joi.object({
  team_id: id.regex(/^[0-9a-fA-F]{24}$/).error(new Error('team_id is not valid')),
});
const IDSchema2 = Joi.object({
  fixture_id: id.regex(/^[0-9a-fA-F]{24}$/).error(new Error('fixture_id is not valid')),
});

export default {
  '/:team_id': IDSchema,
  '/edit/:team_id': IDSchema,
  '/:fixture_id': IDSchema2,
  '/edit/:fixture_id': IDSchema2,
};
