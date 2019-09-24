import User from '../db/models';


class User {
  static async userSignup(req, res) {
    try {
      const { userName, email, password } = req.body;

      const role = userRole || 'user';
      const values = { userName, email, password, role };
      const result = await User.create(values);
      const token = await generateToken({ id, userName, email, role });

      return res.status(201).json({
        status: 201,
        message: 'Registeration Successful',
        token
      });
      
    } catch (err) {
      return res.status(500).json({
        status: 500,
        error: err.message,
      });
    }
  }
}

export default User;
