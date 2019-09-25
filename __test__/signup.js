import request from 'supertest';
import app from '../api';

describe('User Signup', () => {
  const signupRoute = '/api/v1/auth/signup';
  it('Successful', async () => {
    const res = await request(app)
      .post(signupRoute)
      .send({
        firstname: 'freddy',
        lastname: 'moon',
        username: 'freddy',
        email: 'freddy@test.com',
        password: 'password'
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('message');
    expect(res.body).toHaveProperty('status');
    expect(res.body).toHaveProperty('token');
    expect(res.body).toHaveProperty('refreshToken');
    expect(res.body.status).toBe(201);
    expect(res.body.message).toBe('Successfully Signed Up');
  }, 50000);

  it('when no data', async () => {
    const res = await request(app)
      .post(signupRoute)
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
  });

  it('when wrong data', async () => {
    const res = await request(app)
      .post(signupRoute)
      .send({
        firstname: '63ghd5',
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
    const res = await request(app)
      .post(signupRoute)
      .send({
        firstname: 'freddy',
        lastname: 'moon',
        username: 'freddy',
        email: 'freddy2@test.com',
        password: 'password'
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
    const res = await request(app)
      .post(signupRoute)
      .send({
        firstname: 'freddy',
        lastname: 'moon',
        username: 'freddy273',
        email: 'freddy@test.com',
        password: 'password'
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
