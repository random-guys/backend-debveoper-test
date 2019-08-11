/* eslint-disable no-underscore-dangle */
/* eslint-disable linebreak-style */
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import response from '../response';
import UserModel from '../models/User';


class AuthController {
  static async signUp(req, res) {
    try {
      const {
        firstName,
        lastName,
        password,
        address,
        phoneNumber,
      } = req.body;

      // set to lowercase
      const email = req.body.email.toLowerCase();
      const userExists = await UserModel.findUser(email);
      if (userExists) {
        response(res, 400, 'Email already exists');
      } else { // Store user data
        // Hash password
        const hashedPassword = await bcrypt.hash(password, Number(process.env.SALT_ROUNDS));
        const isAdmin = !/user/i.test(req.path);
        const userObject = {
          firstName,
          lastName,
          email,
          phoneNumber,
          password: hashedPassword,
          address,
          isAdmin,
        };
        const newUser = await UserModel.createUser(userObject);
        // Generate jwt
        const token = jwt.sign({ id: newUser._id, email, isAdmin: false }, process.env.JWT_SECRET, { expiresIn: '8760h' });
        // Final response
        response(res, 201, { token, ...newUser });
      }
    } catch (error) {
      response(res, 500, error);
    }
  }
}

export default AuthController;
