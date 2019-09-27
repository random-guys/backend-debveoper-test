/* eslint-disable no-console */
import User from '../models/User';
import hashPassword from '../helpers/hashPassword';
import config from '../config/config';

const { password } = config;

const hash = hashPassword(password);

const data = [
  {
    firstname: 'cavdy',
    lastname: 'cavdy',
    username: 'cavdy',
    email: 'cavdy@cavdy.com',
    admin: true,
    password: hash,
  }
];
const seedUser = async () => {
  try {
    data.map(async (user) => {
      const newUser = await new User(user);
      newUser.save();
    });
    console.log('User successfully seeded');
  } catch (error) {
    console.log('User seeder failed');
  }
};

export default seedUser;
