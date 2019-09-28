import validator from 'validator';
import spaceTrimer from '../helpers/spaceTrimer';

const fields = (data) => {
  let {
    firstname, lastname, username, email, password, role
  } = data;

  firstname = spaceTrimer(firstname).toLowerCase();
  lastname = spaceTrimer(lastname).toLowerCase();
  username = spaceTrimer(username).toLowerCase();
  email = spaceTrimer(email).toLowerCase();
  password = spaceTrimer(password);

  const errors = {};
  if (!validator.isAlpha(firstname)) {
    errors.firstname = 'FirstName should be alphabet';
  }
  if (!validator.isLength(firstname, { min: 2, max: 10 })) {
    errors.firstname = 'FirstName should be between 2 and 10 characters';
  }

  if (!validator.isAlpha(lastname)) {
    errors.lastname = 'LastName should be alphabet';
  }
  if (!validator.isLength(lastname, { min: 2, max: 10 })) {
    errors.lastname = 'LastName should be between 2 and 10 characters';
  }

  if (!validator.isAlphanumeric(username)) {
    errors.username = 'Username can only contain alphabet and numbers';
  }
  if (!validator.isLength(username, { min: 3, max: 15 })) {
    errors.username = 'Username should be between 3 and 15 characters';
  }

  if (!validator.isEmail(email)) {
    errors.email = 'Please put in a valid email';
  }

  if (!validator.isLength(password, { min: 7 })) {
    errors.password = 'Password should be at least 7 characters long';
  }

  const newData = {
    firstname, lastname, username, email, password, role
  };

  return {
    errors,
    newData
  };
};

export default fields;
