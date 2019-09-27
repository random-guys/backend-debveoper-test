const fixtureObject = (data) => {
  const { _id, home, away, fixture, fixture_link } = data;
  return {
    _id,
    home,
    away,
    fixture,
    fixture_link
  };
};

export default fixtureObject;
