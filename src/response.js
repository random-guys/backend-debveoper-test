const response = (responseObject, data, code) => {
  const res = responseObject;
  if (code >= 400) { // data will be an error
    return res.status(code).json({
      status: code,
      error: `${data}`,
      success: false,
    });
  }
  return res.status(code).json({ // return data
    status: code,
    data,
    success: true,
  });
};

export default response;
