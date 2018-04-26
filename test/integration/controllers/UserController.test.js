
/** 
 * Test model: UserModel.test.js
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @sails docs  :: http://sailsjs.org/documentation/concepts/testing - 
 * @chai docs	:: http://chaijs.com/guide/styles/
 * @sinon docs	:: http://sinonjs.org/docs/
 * @supertest 	:: https://github.com/visionmedia/supertest
 */
"use strict";

var request = require('supertest');


describe('Controllers/UserController', () => {
	//
	describe('GET /user', () => {
		it('should return 200 if get data ok', done => {
			request(sails.hooks.http.app)
				.get('/api/user/0/10/undefined')
				.expect(200, done);
		});
	});

	// create user with validated data
	describe('POST /user/create', () => {
		it('should return 200 if validated data   ok', done => {
			var userdata = {
				"email": "phamconguyen1@gmail.com",
				"password":"11111111",
				"fullName": "phamconguyen",
				"userType": "1",
				"roles":[{"id":"598ae3d8b62226f42cf05319"}],
				"companies":[{"companyId":"5996a7ee734d98493461e83a","companyName":"company 1"}]
			};
			request(sails.hooks.http.app)
				.post('/user/create')
				.send(userdata)
				.expect(200, done);
		});
	});

	// //delete user
	describe('DELETE /user', () => {
		var user;
		var userdata = {
			"email": "uyenpcs9@gmail.com",
			 "password":"1234564545411",
			"fullName": "fullName",
			"userType": "0",
			"roles":[{"id":"59841461c73b8a143751ba1f"}]

		};

		before(done => {
			User.create(userdata).then(item => {
				user = item;
				done();
			}).catch(err => {
				done(err);
			});
		});

		it('should return 200 if delete ok', done => {
			request(sails.hooks.http.app)
				.delete('/user/deleteUser/' + user.id)
				.expect(200, done);
		});
		//
		after(done => {
			User.destroy(user.id).then(() => {
				done();
			}).catch(err => {
				done(err);
			});
		});
	});

	//update user
	describe('PUT  /user/update',()=> {
		var user;
		var userdata = {
			"email": "uyenp21@gmail.com",
			"fullName": "fullName",
			"password":"1234564545411",
			"userType": "0",
			"roles":[{"id":"598ae3d8b62226f42cf05319"}]
		};

		before(done => {
			User.create(userdata).then(item => {
				//user = item;
				user={
					"id":item.id,
					"email": "uyenpc1@gmail.com",
					"fullName": "fullName121",
					"password":item.password,
					"userType": item.userType,
					"roles":[{"id":"598ae3d8b62226f42cf05319"}],
					"companies":[{"companyId":"5996a7ee734d98493461e83a","companyName":"company 1"}]
				}
				done();
			}).catch(err => {
				done(err);
			});
		});

		it('should return 200 if update ok', done =>{
			request(sails.hooks.http.app)
				.put('/user/update')
				.send(user)
				.expect(200, done);
		});
		//
		after(done => {
			User.destroy(user.id).then(() => {
				done();
			}).catch(err => {
				done(err);
			});
		});

	});


});
