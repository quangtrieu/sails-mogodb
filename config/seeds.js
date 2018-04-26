/**
 * Created by TrieuLQ on 31/07/2017
 * Description: seeding data
 */

module.exports.seeds = {

  activity: {
    data: [
      { url: '/api/scope', method: 'GET', urlRegex: 'get/api/scope' },
      { url: '/api/scope', method: 'POST', urlRegex: 'post/api/scope' },
      { url: '/api/scope', method: 'PUT', urlRegex: 'put/api/scope' },
      { url: '/api/scope', method: 'DELETE', urlRegex: 'delete/api/scope/{id}' },
    ],
    // overwrite: false
  },

  user: {
    // overwrite: true,
    data: [
    ]
  },

  scope: {
    // overwrite: true,
    data: [
      {
        scopeName: 'Add',
        description: 'only add',
      },
      {
        scopeName: 'Add2',
        description: 'only add',
      }
    ]
  },

  role: {
    // overwrite: true,
    data: [
      {
        roleName: 'System Admin',
        description: 'Admin system'
      }
    ]
  },
};
