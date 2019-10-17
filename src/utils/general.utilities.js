import bcrypt from 'bcryptjs';

const General = {
  /**
   * @description - validate password
   * @param {string} password
   * @param userPassword
   * @returns {boolean}
   */
  validate(password, userPassword) {
    return bcrypt.compareSync(password, userPassword);
  },
  /**
   * @description - encrypt password
   * @param {object} password
   * @returns {object} hashpassword
   */
  async hash(password) {
    const salt = await bcrypt.genSalt(10);
    try {
      return await bcrypt.hash(password, salt);
    } catch (error) {
      throw error;
    }
  },
  /**
   * @description - remove null key from ab object
   * @returns {object}
   * @param obj
   */
  stripNull(obj) {
    let cleanObj = {};

    Object.keys(obj).forEach((val) => {
      const newVal = obj[val];
      cleanObj = newVal ? { ...cleanObj, [val]: newVal } : cleanObj;
    });

    return cleanObj;
  },
};

export default General;
