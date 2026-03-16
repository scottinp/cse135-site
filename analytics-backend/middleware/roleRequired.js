function roleRequired(...allowedRoles) {
  return (req, res, next) => {
    if (!req.session || !req.session.user) {
      return res.redirect('/backend/login');
    }

    if (!allowedRoles.includes(req.session.user.role)) {
      return res.status(403).send('403 Forbidden');
    }

    return next();
  };
}

module.exports = roleRequired;