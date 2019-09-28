const userObject = (data) => {
  const { _id, username, email, admin } = data;
  return { _id, username, email, admin };
};

export default userObject;
