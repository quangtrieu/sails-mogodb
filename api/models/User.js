/**
 * Created by TrieuLQ on 28/07/2017
 * Description: Store and implement business logic for User
 */
const bcrypt = require('bcrypt');
module.exports = {
  attributes: {
    email: {
      type: 'email',
      unique: true,
      required: true
    },

    fullName: {
      type: 'string',
      required: true,
      size: 50
    },

    company: {
      type: 'json'
    },

    roles: {
      type: 'json'
    },
    location: {
      type: 'json'
    },
    password: {
      type: 'string',
      minLength: 6,

    },
    userType: {
      type: 'string',
      minLength: 1,
      required: true,
    },
    toJSON: function () {
      let obj = this.toObject();
      delete obj.password;
      return obj;
    }
  },
  beforeCreate: function (values, cb) {
    bcrypt.hash(values.password, 10, function (err, hash) {
      if (err) return cb(err);
      values.password = hash;

      cb();
    });
  },

  updateOrCreate: function (criteria, values, cb) {
    var self = this;
    if (!values) values = criteria.where ? criteria.where : criteria;

    this.findOne(criteria, function (err, result) {
      if (err) return cb(err, false);

      if (result) {
        self.update(criteria, values, cb);
      } else {
        self.create(values, cb);
      }
    });
  },

  comparePassword: (password, user, cb) => {
    bcrypt.compare(password, user.password, (err, match) => {
      if (err) cb(err);
      if (match) {
        cb(null, true);
      } else {
        console.log("loi dang nhap");
        cb(err);
      }
    });
  },
};

