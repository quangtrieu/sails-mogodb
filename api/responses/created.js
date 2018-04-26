/**
 * Created by TrieuLQ on 2/8/2017
 * Description:
 */

module.exports = function created(data, options) {

  // Get access to `req`, `res`, & `sails`
  var req = this.req;
  var res = this.res;
  var sails = req._sails;

  sails.log.silly('res.created() :: Sending 201 ("CREATED") response');

  // Set status code
  res.status(201);

  // Set response content type
  res.type('application/json');

  return res.json(data);
};
