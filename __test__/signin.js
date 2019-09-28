import request from 'supertest';
import app from '../api';

describe('User Signin', () => {
  const signinRoute = '/api/v1/auth/signin';
  it('Successful', async () => {
    const res = await request(app)
      .post(signinRoute)
      .send({
        email: 'freddy@test.com',
        password: 'password'
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('message');
    expect(res.body).toHaveProperty('status');
    expect(res.body).toHaveProperty('token');
    expect(res.body).toHaveProperty('refreshToken');
    expect(res.body.status).toBe(200);
    expect(res.body.message).toBe('Successfully Signed In');
  });

  it('when no data', async () => {
    const res = await request(app)
      .post(signinRoute)
      .send();
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('message');
    expect(res.body).toHaveProperty('status');
    expect(res.body).toHaveProperty('data');
    expect(res.body.data).toHaveProperty('email');
    expect(res.body.data).toHaveProperty('password');
    expect(res.body.status).toBe(400);
    expect(res.body.message).toBe('Fields are required');
    expect(res.body.data.email).toBe('Please put in a valid email');
    expect(res.body.data.password)
      .toBe('Password should be at least 7 characters long');
  });

  it('Email dont exist', async () => {
    const res = await request(app)
      .post(signinRoute)
      .send({
        email: 'freddy48@test.com',
        password: 'password'
      });
    expect(res.statusCode).toEqual(404);
    expect(res.body).toHaveProperty('message');
    expect(res.body).toHaveProperty('status');
    expect(res.body).toHaveProperty('data');
    expect(res.body.data).toHaveProperty('email');
    expect(res.body.status).toBe(404);
    expect(res.body.message).toBe('Email error');
    expect(res.body.data.email).toBe('Email does not exist');
  });

  it('Incorrect Password', async () => {
    const res = await request(app)
      .post(signinRoute)
      .send({
        email: 'freddy@test.com',
        password: 'password22'
      });
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('message');
    expect(res.body).toHaveProperty('status');
    expect(res.body).toHaveProperty('data');
    expect(res.body.data).toHaveProperty('password');
    expect(res.body.status).toBe(400);
    expect(res.body.message).toBe('Password error');
    expect(res.body.data.password).toBe('Password is incorrect');
  });
});
