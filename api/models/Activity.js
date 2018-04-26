/**
 * Created by TrieuLQ on 31/07/2017
 * Description: Store an Action data
 */

module.exports = {
	attributes: {
		url: {
			type: 'string',
			size: 100,
		},
		method: {
			type: 'string',
			size: 10,
		},
		urlRegex: {
			type: 'string',
			size: 100
		},
		scopes: {
			collection: 'scope',
			via: 'activities'
		}
	},

	beforeCreate: (values, cb) => {
		Activity.findOne({ url: values.url, method: values.method, urlRegex: values.urlRegex }).then(data => {
			if (data) {
				return cb('A record with that [URL, Method, UrlRegex] already exists');
			}
			cb();
		});
	},
	beforeUpdate: (values, cb) => {
		Activity.findOne({ url: values.url, method: values.method, urlRegex: values.urlRegex }).then(data => {
			if (data) {
				return cb('A record with that [URL, Method, UrlRegex] already exists');
			}
			cb();
		});
	}
};