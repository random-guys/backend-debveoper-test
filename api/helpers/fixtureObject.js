const fixtureObject = (data) => {
  const { _id, home, away, fixture, fixture_link, match_date } = data;
  return {
    _id,
    home,
    away,
    fixture,
    fixture_link,
    match_date
  };
};

export default fixtureObject;
