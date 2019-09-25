const checkRole = (req, res, next) => {
  const { admin } = res.locals.userData;

  if (!admin) {
    return res.status(401).json({
      status: 401,
      message: 'You are not authorized. Contact the Admin'
    });
  }

  return next();
};

export default checkRole;
