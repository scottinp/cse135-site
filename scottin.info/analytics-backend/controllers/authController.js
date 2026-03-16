require('dotenv').config();

function showLogin(req, res) {
  if (req.session.user) {
    if (req.session.user.role === 'viewer') {
      return res.redirect('/backend/reports');
    }
    return res.redirect('/backend/dashboard');
  }

  res.render('login', { error: null });
}

function login(req, res) {
  const { username, password } = req.body;

  const accounts = [
    {
      username: process.env.SUPERADMIN_USERNAME,
      password: process.env.SUPERADMIN_PASSWORD,
      role: 'super_admin'
    },
    {
      username: process.env.ANALYST_USERNAME,
      password: process.env.ANALYST_PASSWORD,
      role: 'analyst'
    },
    {
      username: process.env.VIEWER_USERNAME,
      password: process.env.VIEWER_PASSWORD,
      role: 'viewer'
    }
  ];

  const matchedUser = accounts.find(
    account => account.username === username && account.password === password
  );

  if (matchedUser) {
    req.session.user = {
      username: matchedUser.username,
      role: matchedUser.role
    };

    if (matchedUser.role === 'viewer') {
      return res.redirect('/backend/reports');
    }

    return res.redirect('/backend/dashboard');
  }

  res.render('login', { error: 'Invalid username or password' });
}

function logout(req, res) {
  req.session.destroy(() => {
    res.redirect('/backend/login');
  });
}

module.exports = {
  showLogin,
  login,
  logout
};