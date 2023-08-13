const jwt = require('jsonwebtoken');

const authGuard = (req, res, next) => {
  const token = req.cookies.jwtlogin;
  
  if (!token) {
    return res.redirect("admin");
  }
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded) {
      res.locals.email = decoded.email;
      return next();
    }
  } catch (err) {
    // Handle the token verification error
    console.error('Token verification failed:', err.message);
    return res.redirect("admin");
  }
};

module.exports = authGuard;