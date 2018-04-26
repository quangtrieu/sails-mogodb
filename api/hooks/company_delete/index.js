
/**
 * Created by TrieuLQ on 8/23/2017.
 */
module.exports = function companyUpdate(sails) {
	var kafka = require('kafka-node');
	var addressKafkaServer = sails.config.pubsub.address;
	var topicName = sails.config.pubsub.comsumner.company_delete;
	var HighLevelConsumer = kafka.HighLevelConsumer;
	var Client = kafka.Client;
	var client = new Client(addressKafkaServer);

	return {
		initialize: function (cb) {

			var topics = [{
				topic: topicName
			}];


			var options = {
				autoCommit: true,
			};

			var consumer = new HighLevelConsumer(client, topics, options);
			consumer.on('message', function (message) {
				handleMessage(message);
			});

			consumer.on('error', function (err) {
				console.log('error', err);
			});
			return cb();
		}
	};


	function handleMessage(message) {

		let dataParse = JSON.parse(message.value);
		let idCompany = dataParse.companyId;
		UserService.deleteCompanyUser(idCompany).then(data => {
			sails.log("delete company msg", message);
		}).catch(err => {
			sails.log("delete failed", err);
		})
	}

};
