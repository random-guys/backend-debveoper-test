import request from 'supertest';
import app from '../api';
import config from '../api/config/config';

const { password } = config;

describe('ADMIN', () => {
  describe('ADMIN SIGNUP', () => {
    const signupRoute = '/api/v1/auth/admin/signup';
    const signinRoute = '/api/v1/auth/signin';
    it('ADMIN SIGNUP SUCCESS', async () => {
      const response = await request(app)
        .post(signinRoute)
        .send({
          email: 'cavdy@cavdy.com',
          password
        });
      const res = await request(app)
        .post(signupRoute)
        .set('Authorization', `Bearer ${response.body.refreshToken}`)
        .send({
          firstname: 'freddy',
          lastname: 'moon',
          username: 'admin',
          email: 'admin@test.com',
          password: 'password',
          role: 'true'
        });
      expect(res.statusCode).toEqual(201);
      expect(res.body).toHaveProperty('message');
      expect(res.body).toHaveProperty('status');
      expect(res.body).toHaveProperty('token');
      expect(res.body).toHaveProperty('refreshToken');
      expect(res.body.status).toBe(201);
      expect(res.body.message).toBe('Successfully Signed Up');
    });

    it('WHEN NOT ADMIN TO SIGNUP', async () => {
      const response = await request(app)
        .post(signinRoute)
        .send({
          email: 'freddy@test.com',
          password: 'password'
        });
      const res = await request(app)
        .post(signupRoute)
        .set('Authorization', `Bearer ${response.body.refreshToken}`)
        .send({
          firstname: 'freddy',
          lastname: 'moon',
          username: 'admin2',
          email: 'admin2@test.com',
          password: 'password',
          role: 'true'
        });
      expect(res.statusCode).toEqual(401);
      expect(res.body).toHaveProperty('message');
      expect(res.body).toHaveProperty('status');
      expect(res.body.status).toBe(401);
      expect(res.body.message)
        .toBe('You are not authorized. Contact the Admin');
    });

    it('WHEN NO TOKEN', async () => {
      const res = await request(app)
        .post(signupRoute)
        .send({
          firstname: 'freddy',
          lastname: 'moon',
          username: 'admin2',
          email: 'admin2@test.com',
          password: 'password',
          role: 'true'
        });
      expect(res.statusCode).toEqual(403);
      expect(res.body).toHaveProperty('message');
      expect(res.body).toHaveProperty('status');
      expect(res.body.status).toBe(403);
      expect(res.body.message)
        .toBe('no token found');
    });

    it('WHEN INVALID TOKEN', async () => {
      const res = await request(app)
        .post(signupRoute)
        .set('Authorization', 'Bearer 72397hhh')
        .send({
          firstname: 'freddy',
          lastname: 'moon',
          username: 'admin2',
          email: 'admin2@test.com',
          password: 'password',
          role: 'true'
        });
      expect(res.statusCode).toEqual(400);
      expect(res.body).toHaveProperty('message');
      expect(res.body).toHaveProperty('status');
      expect(res.body.status).toBe(400);
      expect(res.body.message)
        .toBe('Invalid token');
    });

    it('when no data', async () => {
      const response = await request(app)
        .post(signinRoute)
        .send({
          email: 'cavdy@cavdy.com',
          password
        });
      const res = await request(app)
        .post(signupRoute)
        .set('Authorization', `Bearer ${response.body.refreshToken}`)
        .send();
      expect(res.statusCode).toEqual(400);
      expect(res.body).toHaveProperty('message');
      expect(res.body).toHaveProperty('status');
      expect(res.body).toHaveProperty('data');
      expect(res.body.data).toHaveProperty('firstname');
      expect(res.body.data).toHaveProperty('lastname');
      expect(res.body.data).toHaveProperty('username');
      expect(res.body.data).toHaveProperty('email');
      expect(res.body.data).toHaveProperty('password');
      expect(res.body.data).toHaveProperty('role');
      expect(res.body.status).toBe(400);
      expect(res.body.message).toBe('Fields are required');
      expect(res.body.data.firstname)
        .toBe('FirstName should be between 2 and 10 characters');
      expect(res.body.data.lastname)
        .toBe('LastName should be between 2 and 10 characters');
      expect(res.body.data.username)
        .toBe('Username should be between 3 and 15 characters');
      expect(res.body.data.email).toBe('Please put in a valid email');
      expect(res.body.data.password)
        .toBe('Password should be at least 7 characters long');
      expect(res.body.data.role)
        .toBe('Role should be a boolean (true / fale)');
    });

    it('when wrong data', async () => {
      const response = await request(app)
        .post(signinRoute)
        .send({
          email: 'cavdy@cavdy.com',
          password
        });
      const res = await request(app)
        .post(signupRoute)
        .set('Authorization', `Bearer ${response.body.refreshToken}`)
        .send({
          firstname: 'admin9836',
          lastname: '638dha',
          username: '4@$#sf',
          email: 'freddy2@test.com',
          password: 'password'
        });
      expect(res.statusCode).toEqual(400);
      expect(res.body).toHaveProperty('message');
      expect(res.body).toHaveProperty('status');
      expect(res.body).toHaveProperty('data');
      expect(res.body.data).toHaveProperty('firstname');
      expect(res.body.data).toHaveProperty('lastname');
      expect(res.body.data).toHaveProperty('username');
      expect(res.body.status).toBe(400);
      expect(res.body.message).toBe('Fields are required');
      expect(res.body.data.firstname)
        .toBe('FirstName should be alphabet');
      expect(res.body.data.lastname)
        .toBe('LastName should be alphabet');
      expect(res.body.data.username)
        .toBe('Username can only contain alphabet and numbers');
    });

    it('Username already exist', async () => {
      const response = await request(app)
        .post(signinRoute)
        .send({
          email: 'cavdy@cavdy.com',
          password
        });
      const res = await request(app)
        .post(signupRoute)
        .set('Authorization', `Bearer ${response.body.refreshToken}`)
        .send({
          firstname: 'adfred',
          lastname: 'moon',
          username: 'admin',
          email: 'admin@test.com',
          password: 'password',
          role: 'false'
        });
      expect(res.statusCode).toEqual(409);
      expect(res.body).toHaveProperty('message');
      expect(res.body).toHaveProperty('status');
      expect(res.body).toHaveProperty('data');
      expect(res.body.data).toHaveProperty('username');
      expect(res.body.status).toBe(409);
      expect(res.body.data.username).toBe('Username already exist');
    });

    it('Email already exist', async () => {
      const response = await request(app)
        .post(signinRoute)
        .send({
          email: 'cavdy@cavdy.com',
          password
        });
      const res = await request(app)
        .post(signupRoute)
        .set('Authorization', `Bearer ${response.body.refreshToken}`)
        .send({
          firstname: 'adfreddy',
          lastname: 'moon',
          username: 'freddy22',
          email: 'admin@test.com',
          password: 'password',
          role: 'false'
        });
      expect(res.statusCode).toEqual(409);
      expect(res.body).toHaveProperty('message');
      expect(res.body).toHaveProperty('status');
      expect(res.body).toHaveProperty('data');
      expect(res.body.data).toHaveProperty('email');
      expect(res.body.status).toBe(409);
      expect(res.body.data.email).toBe('Email already exist');
    });
  });
});
