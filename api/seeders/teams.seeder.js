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
  },
  {
    short_name: 'mancity',
    team_name: 'manchester city',
  },
  {
    short_name: 'liv',
    team_name: 'liverpool',
  },
  {
    short_name: 'eve',
    team_name: 'everton',
  },
  {
    short_name: 'wat',
    team_name: 'watford',
  },
  {
    short_name: 'south',
    team_name: 'southampton',
  },
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
