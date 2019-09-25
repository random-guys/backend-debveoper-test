/* eslint-disable no-console */
import User from '../models/User';
import hashPassword from '../helpers/hashPassword';
import config from '../config/config';
import drop from './drop';

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
    const db = await drop('users');

    data.map(async (user) => {
      const newUser = await new User(user);
      newUser.save();
    });
    console.log('User successfully seeded');
    setTimeout(() => {
      db.disconnect();
    }, 5000);
  } catch (error) {
    console.log('User seeder failed');
  }
};

seedUser();
