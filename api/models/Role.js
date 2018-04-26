/**
 * Created by TrieuLQ on 28/07/2017
 * Description: store user's role
 */

module.exports = {
  attributes: {
    roleName: {
      type: 'string',
      size: 50,
      unique: true,
      required: true
    },
    roleType: {
      type: 'string',
      size: 1
    },
    description: {
      type: 'string',
      size: 200
    },
    scopes: {
      collection: 'scope',
      via: 'roles',
      dominant: true
    }
    // users: {
    //   collection: 'user',
    //   via: 'roles'
    // }
  }
};