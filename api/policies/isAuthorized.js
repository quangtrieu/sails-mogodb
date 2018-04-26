/**
 * isAuthorized
 *
 * @description :: Policy to check if user is authorized with JSON web token
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Policies
 */
let fs = require('fs'),
jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  let token;
  if (req.headers && req.headers.authorization) {
    let parts = req.headers.authorization.split(' ');
    if (parts.length === 2) {
      const scheme = parts[0],
        credentials = parts[1];

      if (/^Bearer$/i.test(scheme)) {
        token = credentials;
      }
    } else {
      return res.json(401, {err: 'Format is Authorization: Bearer [token]'});
    }
  } else if (req.param('token')) {
    token = req.param('token');
    // We delete the token from param to not mess with blueprints
    delete req.query.token;
  } else {
    return res.json(401, {err: 'No Authorization header was found'});
  }

  let cert = fs.readFileSync('config/env/public.pem');  // get public key
  jwt.verify(token, cert, (err, decoded) => {
    if (err) {
      return res.json(401, {err: 'Invalid Token!'});
    }
    req.token = token; // This is the decrypted token or the payload you provided
    req.dataDecoded = decoded;
    next();
  });
};