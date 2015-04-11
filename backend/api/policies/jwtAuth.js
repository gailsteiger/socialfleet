/**
 * Created by gail on 4/11/15.
 */

var jwt = require('jwt-simple');

module.exports = function(req, res, next) {
  if(!req.headers.authorization) {
    return handleError;
  }

  var token = req.headers.authorization.split(' ')[1];

  var payload = jwt.decode(token, config.TOKEN_SECRET);

  if(!payload.sub) {
    return handleError;
  }

  // payload is valid
  req.userId = payload.sub;
  next();
};

function handleError() {
  return res.status(401).send({
    error: 'You are not authorized'
  });
}
