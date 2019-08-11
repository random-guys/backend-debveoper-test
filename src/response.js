/* eslint-disable linebreak-style */
const response = (responseObject, statusCode, dataOrError) => {
  const res = responseObject;
  let x = 'data';
  let success = true;
  let payload = dataOrError;
  if (statusCode >= 400) {
    x = 'error'; success = false; payload = `${payload}`;
  }
  return res.status(statusCode).json({ status: statusCode, [x]: payload, success });
};

export default response;
