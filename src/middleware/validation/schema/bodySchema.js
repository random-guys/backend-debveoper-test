import Joi from '@hapi/joi';

const date = Joi.date();

const name = Joi.string()
  .regex(/^\D+$/);

const string = Joi.string();

const email = Joi.string()
  .email()
  .lowercase()
  .required();

const password = Joi.string()
  .min(6)
  .required()
  .strict();

const id = Joi.string()
  .regex(/^\d+$/);

const createUserSchema = Joi.object({
  first_name: name.required(),
  last_name: name.required(),
  email,
  password,
  confirm_password: Joi.string()
    .valid(Joi.ref('password'))
    .required()
    .strict()
    .error(new Error('Your password and confirm password do not match')),
});

const createAdminSchema = Joi.object({
  first_name: name.required(),
  last_name: name.required(),
  email,
  password,
  confirm_password: Joi.string()
    .valid(Joi.ref('password'))
    .required()
    .strict()
    .error(new Error('Your password and confirm password do not match')),
  is_admin: Joi.boolean().default(true, {
    invalid: true,
  }),
});

const userSigninSchema = Joi.object({
  email,
  password,
});

const addTeamSchema = Joi.object({
  team_name: name.required(),
  location: name.required(),
  year_founded: date.required(),
  current_manager: name.required(),
  stadium: name.required(),
  major_trophies: id.required(),
  motto: name.required(),
});
const editTeamSchema = Joi.object({
  team_name: name,
  location: name,
  year_founded: date,
  current_manager: name,
  stadium: name,
  major_trophies: id,
  motto: name,
});
const addFixtureSchema = Joi.object({
  team_A: name.required(),
  team_B: name.required(),
  venue: name.required(),
  date: date.required(),
  time: string.required(),
  status: name.valid('pending', 'completed').required(),
});
const editixtureSchema = Joi.object({
  team_A: name,
  team_B: name,
  venue: name,
  date,
  time: string,
  status: name.valid('pending', 'completed'),
  scores: string,
});


export default {
  '/admin/signup': createAdminSchema,
  '/regular/signup': createUserSchema,
  '/signin': userSigninSchema,
  '/add': addTeamSchema,
  '/edit/:team_id': editTeamSchema,
  '/create': addFixtureSchema,
  '/edit/:fixture_id': editixtureSchema,
};
