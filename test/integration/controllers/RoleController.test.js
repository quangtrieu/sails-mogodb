/**
 * Test model: RoleModel.test.js
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @sails docs  :: http://sailsjs.org/documentation/concepts/testing -
 * @chai docs  :: http://chaijs.com/guide/styles/
 * @sinon docs  :: http://sinonjs.org/docs/
 * @supertest  :: https://github.com/visionmedia/supertest
 */
"use strict";

//TODO: you must create the defining test
var request = require('supertest');

describe('Controllers/RoleController', () =>{

	describe('GET /role', () =>{
		it('should return 200 if get data ok', done =>{
			request(sails.hooks.http.app)
				.get('/role')
				.expect(200, done);
		});
	});
	//create role without role name
	describe('POST /role/create', () =>{
		it('should return 200 if role name is undefine post ok', done =>{
			var _role = {
				"scopes": [{"id": "59829add7648c74803f431a1"}]

			};
			request(sails.hooks.http.app)
				.post('/role/create')
				.send(_role)
				.expect(400, done);
		});
	});

	//create role with role name is empty
	describe('POST /role/create', () =>{
		it('should return 200 if post role name empty ok', done =>{
			var _roleNameEmpty = {
				"roleName": "",
				"scopes": [{"id": "59829add7648c74803f431a1"}]

			};
			request(sails.hooks.http.app)
				.post('/role/create')
				.send(_roleNameEmpty)
				.expect(400, done);
		});
	});


	describe('POST /role/create', () =>{
		it('should return 200 if post full data ok', done =>{
			var _roleFull = {
				"roleName": "roleNam1e1",
				"scopes": [{"id": "59829add7648c74803f431a1"}],

			};
			request(sails.hooks.http.app)
				.post('/role/create')
				.send(_roleFull)
				.expect(200, done);
		});

	});


//	delete role
	describe('DELETE /role', () =>{
		var role;
		var roleData = {
			"roleName": "testDelRoleName",
			"scopes": [{"id": "59829add7648c74803f431a1"}]
		};

		before(done =>{
			Role.create(roleData).then(item =>{
				role = item;
				done();
			}).catch(err =>{
				done(err);
			});
		});

		it('should return 200 if delete ok', done =>{
			request(sails.hooks.http.app)
				.delete('/role/deleteRole/' + role.id)
				.expect(200, done);
		});
		//
		after(done =>{
			Role.destroy(role.id).then(() =>{
				done();
			}).catch(err =>{
				done(err);
			});
		});
	});


	// delete role with id undefined
	describe('DELETE /role', () =>{
		var role;
		var roleData = {
			"roleName": "testDelRoleName",
			"scopes": [{"id": "59829add7648c74803f431a1"}]
		};

		before(done =>{
			Role.create(roleData).then(item =>{
				role = item;
				done();
			}).catch(err =>{
				done(err);
			});
		});

		it('should return 200 if delete ok', done =>{
			request(sails.hooks.http.app)
				.delete('/role/deleteRole/ ')
				.expect(404, done);
		});
		//
		after(done =>{
			Role.destroy(role.id).then(() =>{
				done();
			}).catch(err =>{
				done(err);
			});
		});
	});

	//update role
	describe('PUT  /role/update', () =>{
		var role;
		var roleData = {
			"roleName": "testUpdateRole1",
			"description" : "role description",
			"scopes": [{"id": "59829add7648c74803f431a1"}]
		};

		before(done =>{
			Role.create(roleData).then(item =>{
				role = item;
				role = {
					"id": item.id,
					"roleName": "testUpdateRole4",
					"scopes": [{"id": "59829add7648c74803f431a1"}, {"id": "59817481b96d34fc2c63fe64"}]
				}
				done();
			}).catch(err =>{
				done(err);
			});
		});
		//
		it('should return 200 if update ok', done =>{
			console.log(JSON.stringify(role));
			request(sails.hooks.http.app)
				.put('/role/update')
				.send(role)
				.expect(200, done);
		});
		//
		after(done =>{
			Role.destroy(role.id).then(() =>{
				done();
			}).catch(err =>{
				done(err);
			});
		});


	});

	//update without scopes
	describe('PUT  /role/update', () =>{
		var role;
		var roleData = {
			"roleName": "RoleTest"
			//"scopes":[{"id":"59817481b96d34fc2c63fe64"}]
		};

		before(done =>{
			Role.create(roleData).then(item =>{
				role = item;
				role = {
					"id": item.id,
					"roleName": "roleEdited1"
				}
				done();
			}).catch(err =>{
				done(err);
			});
		});

		it('should return 200 if update ok', done =>{
			console.log(JSON.stringify(role));
			request(sails.hooks.http.app)
				.put('/role/update')
				.send(role)
				.expect(200, done);
		});
		//
		after(done =>{
			Role.destroy(role.id).then(() =>{
				done();
			}).catch(err =>{
				done(err);
			});
		});

	});

	//find scope by id
	describe('find role by id  /role/update', () =>{
		var role;
		var roleData = {
			"roleName": "role111",
			"scopes": [{"id": "59817481b96d34fc2c63fe64"}]
		};

		before(done =>{
			Role.create(roleData).then(item =>{
				role = item;
				done();
			}).catch(err =>{
				done(err);
			});
		});

		it('should return 200 if find role ok', done =>{
			console.log(JSON.stringify(role));
			request(sails.hooks.http.app)
				.get('/role/findOne/' + role.id)
				.send(role)
				.expect(200, done);
		});
		//
		after(done =>{
			Role.destroy(role.id).then(() =>{
				done();
			}).catch(err =>{
				done(err);
			});
		});

	});
});
