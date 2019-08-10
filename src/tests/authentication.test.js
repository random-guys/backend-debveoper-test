/* eslint-disable linebreak-style */
import request from 'supertest';
import app from '../app';

describe('POST /api/auth/signup/user', () => {
  describe('When the request body parameters are in the proper format', () => {
    test('It responds with the newly created user', async () => {
      const newUser = await request(app)
        .post('/api/auth/signup/user')
        .send({
          firstName: 'James',
          lastName: 'Doe',
          email: 'jamesdoes@test.com',
          password: '123456',
        });
      expect(newUser.body).toHaveProperty('data');
      expect(newUser.body.data).toHaveProperty('id');
      expect(newUser.body.data).toHaveProperty('fullName');
      expect(newUser.body.data).toHaveProperty('email');
      expect(newUser.body.data).toHaveProperty('isAdmin');
      expect(newUser.body.data.isAdmin).toBe(false);
    });
  });
});
