// authMiddleware.js
function isAuthenticated(req, res, next) {
    if (req.session.user_id) {
      return next(); // User is authenticated, proceed to the next middleware or route
    } else {
    res.status(401).send('Unauthorized: Please log in');
    }
}

module.exports = isAuthenticated;
