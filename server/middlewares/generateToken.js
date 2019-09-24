import jwt from 'jsonwebtoken';

/**
   * @description Generate a new token string with the user details
   * @param {object} req
   * @param {string} res
   * @method generateToken
   */
const generateToken = (id, email, isAdmin, userName) => {
  const token = jwt.sign({
    id,
    email,
    isAdmin,
    userName,
  },
  process.env.SECRET_KEY, {
    expiresIn: '24h',
  });

  return token;
};

export default generateToken;
