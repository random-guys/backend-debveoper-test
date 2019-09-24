const userObject = (data) => {
  const { _id, username, email } = data;
  return { _id, username, email };
};

export default userObject;
