import Team from '../db/models/team';

class TeamClass {
  static async addTeam(req, res) {
    try {
      const { isadmin } = user;

      const { name } = req.body;
      if (isadmin) {
        const team = new User({
          name 
        });
       team.save();
      return res.status(201).json({
        status: 201,
        message: 'Team Added Successfully',
        team,
      });
      }
      return res.status(401).json({
        status: 401,
        message: 'You are Forbidden  from accessing this resources',
      });      
    } catch (err) {
      return res.status(500).json({
        status: 500,
        message: err.message,
      });
    }
  }

}

export default TeamClass;
