/**
 * Created by TrieuLQ on 28/07/2017
 * Description: Store and implement business logic for User
 */
var bcrypt = require('bcrypt');
module.exports = {
	attributes: {
		user: {
			model: 'user'
		},

		role: {
			model: 'role'
		},
	},

};

