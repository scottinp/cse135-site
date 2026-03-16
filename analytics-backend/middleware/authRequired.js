function authRequired(req, res, next) {
  if (!req.session || !req.session.user) {
    return res.redirect('/backend/login');
  }
  next();
}

module.exports = authRequired;