/* eslint-disable no-console */
import Fixture from '../models/Fixture';

const data = [
  {
    home: 'chelsea',
    away: 'manchester united',
  },
  {
    home: 'arsenal',
    away: 'liverpool',
  },
  {
    home: 'everton',
    away: 'watford',
  },
  {
    home: 'chelsea',
    away: 'manchester city',
  },
  {
    home: 'manchester united',
    away: 'liverpool',
  },
  {
    home: 'arsenal',
    away: 'everton',
  },
  {
    home: 'chelsea',
    away: 'watford',
  },
  {
    home: 'liverpool',
    away: 'southampton',
  },
];
const seedFixtures = async () => {
  try {
    data.map(async (fixture) => {
      const newFixture = await new Fixture(fixture);
      newFixture.save();
    });
    console.log('Fixtures successfully seeded');
  } catch (error) {
    console.log('Fixtures seeder failed');
  }
};

export default seedFixtures;
