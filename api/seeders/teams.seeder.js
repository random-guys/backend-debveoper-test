/* eslint-disable no-console */
import Team from '../models/Team';

const data = [
  {
    short_name: 'chel',
    team_name: 'chelsea',
  },
  {
    short_name: 'ars',
    team_name: 'arsenal',
  },
  {
    short_name: 'manutd',
    team_name: 'manchester united',
  }
];
const seedTeams = async () => {
  try {
    data.map(async (team) => {
      const newTeam = await new Team(team);
      newTeam.save();
    });
    console.log('Team successfully seeded');
  } catch (error) {
    console.log('Team seeder failed');
  }
};

export default seedTeams;
