/* eslint-disable consistent-return */
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
/**
    * @description Authenticate a user
    * @method auth
    * @params {object} req
    * @return {object} res
    *
   */
const authenticate = async (req, res, next) => {
  
  const token = req.header('x-access-token') || req.body.token || req.query.token;
  if (!token) {
    return res.status(401).json({
      status: 401,
      error: 'access denied, no token provided',
    });
  }
  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    // const user = await AuthenticationHelper.getAuthUser(decoded.id);
    const user = jwt.decode(decoded);
    console.log(user, '<><><><><><><><><')

    req.authUser = user;

    next();
  } catch (error) {
    res.status(401).json({
      status: 401,
      error: 'authentication failed, please login again',
    });
  }
};

export default authenticate;
