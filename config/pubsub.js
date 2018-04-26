/**
 * Created by TrieuLQ on 8/23/2017.
 */

module.exports.pubsub = {
	address: '192.168.79.128:2181',
	comsumner: {
		company_update: 'COMPANY_UPDATE',
		company_delete: 'COMPANY_DELETE'
	},
	producer: {
		user_update: 'USER_UPDATE',
		user_delete: 'USER_DELETE'
	}
};

