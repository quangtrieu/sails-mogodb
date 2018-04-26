var request = require('supertest');

describe('Controllers/Activity', () => {
	describe('POST /activity', () => {
		it('should return 200 if post ok', done => {
			var _activity = {
				"url": "/api/activity",
				"method":"GET",
				"urlRegex":"get/api/activity"
			};
			request(sails.hooks.http.app)
				.post('/api/activity')
				.send(_activity)
				.expect(200, done);
		});
	});

	describe('PUT /activity', () => {
		it('should return 200 if put ok', done => {
			var activity;
			var _activity = {
				"url": "/api/activity",
				"method":"GET",
				"urlRegex":"get/api/activity"
			};

			before(done => {
				Activity.create(_activity).then(item => {
					activity = item;
					activity.url = "test";
					done();
				}).catch(err => {
					done(err);
				});
			});

			request(sails.hooks.http.app)
				.put('/api/activity')
				.send(activity)
				.expect(200, done);
		});
	});

	describe('GET /activity', () => {
		it('should return 200 if get ok', done => {
			request(sails.hooks.http.app)
				.get('/api/activity')
				.expect(200, done);
		});
	});

	describe('DELETE /activity', () => {
		var activity;
		var _activity = {
			"url": "/api/activity",
			"method":"GET",
			"urlRegex":"get/api/activity"
		};

		before(done => {
			Activity.create(_activity).then(item => {
				activity = item;
				done();
			}).catch(err => {
				done(err);
			});
		});

		it('should return 200 if delete ok', done => {

			request(sails.hooks.http.app)
				.delete('/api/activity/' + activity.id)
				.expect(200, done);

		});

		after(done => {
			Activity.destroy(activity.id).then(() => {
				done();
			}).catch(err => {
				done(err);
			});
		});
	});

});