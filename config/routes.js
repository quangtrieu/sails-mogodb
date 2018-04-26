/**
 * Created by TrieuLQ on 25/07/2017
 * Description: define routes on api
 */

module.exports.routes = {
    /* API Scope */

    'GET /api/scope': 'ScopeController.getScopes',
    'GET /api/scope/getAllScopes': 'ScopeController.getAllScopes',
    'POST /api/scope': 'ScopeController.createScope',
    'PUT /api/scope': 'ScopeController.updateScope',
    'DELETE /api/scope/:id': 'ScopeController.deleteScope',

    /* API Activity */

    'GET /api/activity': 'ActivityController.getActivities',
    'GET /api/getActivitiesNoPaging': 'ActivityController.getActivitiesNoPaging',
    'POST /api/activity': 'ActivityController.createActivity',
    'PUT /api/activity': 'ActivityController.updateActivity',
    'DELETE /api/activity/:id': 'ActivityController.deleteActivity',

    /* API Role */

    'GET /api/role': 'RoleController.getRoles',
    'DELETE /api/role/:id': 'RoleController.deleteRole',
    'POST /api/role': 'RoleController.createRole',
    'PUT /api/role': 'RoleController.updateRole',

    'GET /api/role/findOne/:id': 'RoleController.findOneRole',
    'GET /api/role/findByUser/:userId': 'UserController.findRoleByUser',
    'GET /api/auth/singUp/:email/:password': 'UserController.singUp',

    /* API User */

    'GET /api/user/:page/:limit/:criteria': 'UserController.getUsers',
    'DELETE /api/user/:id': 'UserController.deleteUser',
    'POST /api/user': 'UserController.createUser',
    'PUT /api/user': 'UserController.updateUser',

    'GET /api/user/findOne/:id': 'UserController.findOneRole'
};