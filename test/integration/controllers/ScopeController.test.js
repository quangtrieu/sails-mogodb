var request = require('supertest');

describe('Controllers/Scope', () => {
  describe('POST /scope', () => {
    it('should return 200 if post ok', done => {
      var _scope = {
        "scopeName": "user_edit_4",
        "activities": [
          {"id":"5983e5c0d28e263c2029b67b"}
        ]
      };
      request(sails.hooks.http.app)
        .post('/api/scope')
        .send(_scope)
        .expect(200, done);
    });
  });

  describe('PUT /scope', () => {
    it('should return 200 if put ok', done => {
      var scope;
      var _scope = {
        "scopeName":"user3",
        "activities":[{"id":"5983e5c0d28e263c2029b67c"},{"id":"5983e5c0d28e263c2029b67b"}]
      };

      before(done => {
        Scope.create(_scope).then(item => {
          scope = item;
          console.log('ttt '+ scope);
          scope.scopeName = "test";
          done();
        }).catch(err => {
          done(err);
        });
      });

      request(sails.hooks.http.app)
        .put('/api/scope')
        .send(scope)
        .expect(200, done);
    });
  });

  describe('GET /scope', () => {
    it('should return 200 if get ok', done => {
      request(sails.hooks.http.app)
        .get('/api/scope')
        .expect(200, done);
    });
  });

  describe('DELETE /scope', () => {
    var scope;
    var _scope = {
      "scopeName": "user_edit_3",
      "activities": [
        {"id":"5983e5c0d28e263c2029b67b"},
        {"id":"5983e5c0d28e263c2029b67c"},
        {"id":"5983e5c0d28e263c2029b67d"},
        {"id":"5983e5c0d28e263c2029b67e"}
      ]
    };

    before(done => {
      Scope.create(_scope).then(item => {
        scope = item;
        done();
      }).catch(err => {
        done(err);
      });
    });

    it('should return 200 if delete ok', done => {

      request(sails.hooks.http.app)
        .delete('/api/scope/' + scope.id)
        .expect(200, done);

    });

    after(done => {
      Scope.destroy(scope.id).then(() => {
        done();
      }).catch(err => {
        done(err);
      });
    });
  });

});