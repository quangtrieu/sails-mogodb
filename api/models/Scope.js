/**
 * Created by TrieuLQ on 28/07/2017
 * Description: store permissions of role
 */

module.exports = {
	attributes: {
		scopeName: {
			type: 'string',
			unique: true,
			required: true,
			size: 50
		},
		description: {
			type: 'string',
			size: 200
		},
		activities: {
			collection: 'activity',
			via: 'scopes',
			dominant: true
		},
		createdBy: {
			type: 'string',
			size: 50
		},
		roles: {
			collection: 'role',
			via: 'scopes'
		}
	}
};
