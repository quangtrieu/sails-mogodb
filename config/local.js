/**
 * Created by TrieuLQ on 25/07/2017
 * Description: setting local configurations
 */
module.exports = {
  hookTimeout: 6000,
  environment: process.env.NODE_ENV || 'development',

  mongodbServer: {
    adapter: 'sails-disk',
    filePath: 'data/'
  }
};
