const adminOnly = (req, res, next) => {
  if (req.user && req.user.admin) {
    next();
  } else {
    res.status(403).json({ msg: 'Access denied. Admins only.' });
  }
};

export default adminOnly;
