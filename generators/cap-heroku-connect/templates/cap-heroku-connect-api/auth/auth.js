var jwt = require('express-jwt');
var jwts = require('jwks-rsa');
var jwtCheck = jwt({
  secret: jwts.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `<%= jwksUri %>`
  }),
  getToken: function fromHeaderOrQuerystring (req) {
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
      return req.headers.authorization.split(' ')[1];
    } else if (req.query && req.query.access_token){
      return req.query.access_token;
    }
    return null;
  },
  audience: `<%= audience %>`,
  issuer: `<%= issuer %>`,
  algorithms: ['RS256']
});
module.exports = function() {
  return jwtCheck
}
