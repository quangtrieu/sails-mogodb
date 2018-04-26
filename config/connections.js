/**
 * Created by TrieuLQ on 25/07/2017
 * Description: setting Database connections
 */

module.exports.connections = {
  mongodbServer: {
    adapter: 'sails-mongo',
    host: 'localhost',
    port: 27017,
    database: 'AuthApi'
  }

  /* mongodbServer: {
     adapter: 'sails-disk',
     filePath: 'data/'
   }*/
};
