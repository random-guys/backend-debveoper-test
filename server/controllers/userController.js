import User from '../db/models/user';
import generateToken from '../middlewares/generateToken';


class Auth {
  static async userSignup(req, res) {
    try {
      const { userName, email, password } = req.body;

      const isAdmin = false;
      const values = { userName, email, password, isAdmin };
        const user = new User({
          userName: values.userName,
          email: values.email,
          password: values.password,
          isAdmin: values.isAdmin 
        });
       user.save();

      const { id } = user
      const token = await generateToken({ id, userName, email, isAdmin });

      return res.header('x-access-token', token).status(201).json({
        status: 201,
        message: 'Registeration Successful',
        user,
        token
      });
      
    } catch (err) {
      return res.status(500).json({
        status: 500,
        error: err.message,
      });
    }
  }

  static async userLogin(req, res) {
    try {
      const { email, password } = req.body;
      
      const result = await User.findOne({email})
        if (result) {
          if (password === result.password) {
            const { id, userName, email, isAdmin } = result;
            const token = await generateToken({ id, userName, email, isAdmin });
  
            const user = {
              id: result.id,
              userName: result.userName,
              email: result.email,
              isAdmin: result.isAdmin,
            };
  
            return res.status(200).json({
              status: 200,
              message: 'User Login successful',
              user,
              token
            });
          }
        }
        return res.status(401).json({
          status: 401,
          message: 'Invalid email or password'
        });
    } catch (err) {
      return res.status(500).json({
        status: 500,
        error: err.message,
      });
    }
  }
}

export default Auth;
