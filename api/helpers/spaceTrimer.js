const spaceTrimer = (data) => {
  const spaces = /\s/g;
  return data !== undefined ? data.replace(spaces, '') : '';
};

export default spaceTrimer;
