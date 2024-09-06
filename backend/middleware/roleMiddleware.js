// roleMiddleware.js
const roleMiddleware = (requiredRole) => (req, res, next) => {
    // Assumes you have user role in req.user
    if (!req.user || req.user.role !== requiredRole) {
      return res.status(403).json({ error: 'Accès refusé' });
    }
    next();
  };
  
  module.exports = roleMiddleware;
  