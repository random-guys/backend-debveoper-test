import request from 'supertest';
import app from '../index';

import User from '../models/users.model';
import TestDbHelper from '../../testDB';

const dbHelper = new TestDbHelper();
let adminToken;
let userToken;

/**
 * Insert set of sample products into the database
 */
async function createSampleUsers() {
  const user1 = await new User({
    first_name: 'User',
    last_name: 'One',
    email: 'userone@gmail.com',
    password: '$2a$10$17MpQeJWeiXDlMhae/UvkO8I04nB4XOX24FnH0qN9i3VO8r9WFHni',
    is_admin: true,
  }).save();
  const user2 = await new User({
    first_name: 'User',
    last_name: 'Two',
    email: 'usertwo@gmail.com',
    password: '$2a$10$17MpQeJWeiXDlMhae/UvkO8I04nB4XOX24FnH0qN9i3VO8r9WFHni',
    is_admin: false,
  }).save();
  return { user1, user2 };
}

beforeAll(async () => {
  await dbHelper.start();
  const { user1 } = await createSampleUsers();
  const response = await request(app)
    .post('/api/v1/users/signin')
    .send({
      email: user1.email,
      password: 'johnbaby',
    });
  adminToken = response.body.data.token; // save the token!
});

afterAll(async () => {
  await dbHelper.stop();
});

describe('All user /user', () => {
  describe('POST /regular user', () => {
    test('It responds with the newly created regular user', async () => {
      const response = await request(app)
        .post('/api/v1/users/regular/signup')
        .send({
          first_name: 'Uni',
          last_name: 'Que',
          email: 'unique@gmail.com',
          password: 'django',
          confirm_password: 'django',
        });
      // Ensure the results returned is correct
      expect(response.statusCode).toBe(200);
      expect(response.body.data).toHaveProperty('id');
      expect(response.body.data).toHaveProperty('first_name');
      expect(response.body.data).toHaveProperty('last_name');
      expect(response.body.data).toHaveProperty('email');
      expect(response.body.data).toHaveProperty('is_admin');
    });
    test('It signs in the regular user', async () => {
      const response = await request(app)
        .post('/api/v1/users/signin')
        .send({
          email: 'unique@gmail.com',
          password: 'django',
        });

      // Ensure the results returned is correct
      expect(response.statusCode).toBe(200);
      expect(response.body.data).toHaveProperty('id');
      expect(response.body.data).toHaveProperty('first_name');
      expect(response.body.data).toHaveProperty('last_name');
      expect(response.body.data).toHaveProperty('email');
      expect(response.body.data).toHaveProperty('is_admin');
      expect(response.body.data).toHaveProperty('token');
    });
    test('It throws an error for unregistered or missing credentials', async () => {
      const response = await request(app)
        .post('/api/v1/users/signin')
        .send({
          email: 'Uniman@gmail.com',
          password: 'django',
        });
      expect(response.statusCode).toBe(400);
      expect(response.body.error).toBe('Invalid credentials');
    });
    test('It throws an error for unregistered or missing credentials', async () => {
      const response = await request(app)
        .post('/api/v1/users/signin')
        .send({
          email: 'unique@gmail.com',
          password: 'djangos23',
        });
      expect(response.statusCode).toBe(400);
      expect(response.body.error).toBe('Invalid credentials');
    });

    test('It throws an error on missing first name', async () => {
      const response = await request(app)
        .post('/api/v1/users/regular/signup')
        .send({
          last_name: 'Que',
          email: 'unique@gmail.com',
          password: 'django',
          confirm_password: 'django',

        });
      expect(response.statusCode).toBe(400);
      expect(response.body.error).toBe('first_name is required');
    });

    test('It throws an error on missing last name', async () => {
      const response = await request(app)
        .post('/api/v1/users/regular/signup')
        .send({
          first_name: 'Uni',
          email: 'unique@gmail.com',
          password: 'django',
          confirm_password: 'django',

        });
      expect(response.statusCode).toBe(400);
      expect(response.body.error).toBe('last_name is required');
    });

    test('It throws an error on missing email', async () => {
      const response = await request(app)
        .post('/api/v1/users/regular/signup')
        .send({
          first_name: 'Uni',
          last_name: 'Que',
          password: 'django',
          confirm_password: 'django',

        });
      expect(response.statusCode).toBe(400);
      expect(response.body.error).toBe('email is required');
    });
    test('It throws an error on missing password', async () => {
      const response = await request(app)
        .post('/api/v1/users/regular/signup')
        .send({
          first_name: 'Uni',
          last_name: 'Que',
          email: 'unique@gmail.com',
          confirm_password: 'django',
        });
      expect(response.statusCode).toBe(400);
      expect(response.body.error).toBe('Your password and confirm password do not match');
    });
    test('It throws an error on missing confirm password', async () => {
      const response = await request(app)
        .post('/api/v1/users/regular/signup')
        .send({
          first_name: 'Uni',
          last_name: 'Que',
          email: 'unique@gmail.com',
          password: 'django',
        });
      expect(response.statusCode).toBe(400);
      expect(response.body.error).toBe('Your password and confirm password do not match');
    });
    test('It throws an error on short password', async () => {
      const response = await request(app)
        .post('/api/v1/users/regular/signup')
        .send({
          first_name: 'Uni',
          last_name: 'Que',
          email: 'unique@gmail.com',
          password: 'tom',
          confirm_password: 'tom',
        });
      expect(response.statusCode).toBe(400);
      expect(response.body.error).toBe('password length must be at least 6 characters long');
    });
  });

  describe('POST /admin user', () => {
    test('It responds with the newly created admin user', async () => {
      const response = await request(app)
        .post('/api/v1/users/admin/signup')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          first_name: 'Ran',
          last_name: 'Dom',
          email: 'random@gmail.com',
          password: 'django',
          confirm_password: 'django',
          is_admin: true,
        });
      expect(response.statusCode).toBe(200);
      expect(response.body.data).toHaveProperty('id');
      expect(response.body.data).toHaveProperty('first_name');
      expect(response.body.data).toHaveProperty('last_name');
      expect(response.body.data).toHaveProperty('email');
      expect(response.body.data).toHaveProperty('is_admin');
      expect(response.body.data).toHaveProperty('token');
    });

    test('It throws an error on missing first name', async () => {
      const response = await request(app)
        .post('/api/v1/users/admin/signup')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          last_name: 'Dom',
          email: 'random@gmail.com',
          password: 'django',
          confirm_password: 'django',
        });
      expect(response.statusCode).toBe(400);
      expect(response.body.error).toBe('first_name is required');
    });

    test('It throws an error on missing last name', async () => {
      const response = await request(app)
        .post('/api/v1/users/admin/signup')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          first_name: 'Ran',
          email: 'random@gmail.com',
          password: 'django',
          confirm_password: 'django',
        });
      expect(response.statusCode).toBe(400);
      expect(response.body.error).toBe('last_name is required');
    });

    test('It throws an error on missing email', async () => {
      const response = await request(app)
        .post('/api/v1/users/admin/signup')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          first_name: 'Ran',
          last_name: 'Dom',
          password: 'django',
          confirm_password: 'django',
        });
      expect(response.statusCode).toBe(400);
      expect(response.body.error).toBe('email is required');
    });
    test('It throws an error on missing password', async () => {
      const response = await request(app)
        .post('/api/v1/users/admin/signup')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          first_name: 'Ran',
          last_name: 'Dom',
          email: 'random@gmail.com',
          confirm_password: 'django',
        });
      expect(response.statusCode).toBe(400);
      expect(response.body.error).toBe(
        'Your password and confirm password do not match',
      );
    });
    test('It throws an error on missing confirm password', async () => {
      const response = await request(app)
        .post('/api/v1/users/admin/signup')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          first_name: 'Ran',
          last_name: 'Dom',
          email: 'random@gmail.com',
          password: 'django',
        });
      expect(response.statusCode).toBe(400);
      expect(response.body.error).toBe(
        'Your password and confirm password do not match',
      );
    });
    test('It throws an error on missing short password', async () => {
      const response = await request(app)
        .post('/api/v1/users/admin/signup')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          first_name: 'Ran',
          last_name: 'Dom',
          email: 'random@gmail.com',
          password: 'tom',
          confirm_password: 'tom',
        });
      expect(response.statusCode).toBe(400);
      expect(response.body.error).toBe(
        'password length must be at least 6 characters long',
      );
    });
  });
});
