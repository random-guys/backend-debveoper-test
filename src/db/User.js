/* eslint-disable consistent-return */
/* eslint-disable no-console */
/* eslint-disable linebreak-style */
import client from '../server';

const users = process.env.NODE_ENV !== 'test' ? 'dev_users' : 'test_users';
let collection;
(async () => {
  try {
    const database = await client.catch((err) => { throw new Error(err); });
    collection = database.collection(users);
  } catch (error) {
    console.log(error);
    collection = false;
  }
})();

class User {
  static find(email) {
    return new Promise(async (resolve, reject) => {
      if (collection === false) {
        return reject(new Error('failed connection'));
      }
      collection.findOne({ email })
        .then(result => resolve(result))
        .catch(err => reject(err));
    });
  }
}
export default User;
