/**
 * Created by TrieuLQ on 2/8/2017
 * Description:
 */

module.exports = function badRequest(data, options) {

  // Get access to `req`, `res`, & `sails`
  var req = this.req;
  var res = this.res;
  var sails = req._sails;
  // Set status code
  res.status(400);

  // Log error to console
  if (data !== undefined) {
    sails.log.verbose('Sending 400 ("Bad Request") response: \n', data);
  }
  else sails.log.verbose('Sending 400 ("Bad Request") response');

  // Only include errors in response if application environment
  // is not set to 'production'.  In production, we shouldn't
  // send back any identifying information about errors.
  if (sails.config.environment === 'production' && sails.config.keepResponseErrors !== true) {
    data = undefined;
  }

  return res.json(data);
};

