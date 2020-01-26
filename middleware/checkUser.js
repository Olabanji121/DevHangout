module.exports = function(req, res, next) {
    req.user.id = req.params.id;
    
    next()
  };
  