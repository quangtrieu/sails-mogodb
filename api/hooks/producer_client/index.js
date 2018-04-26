/**
 * Created by TrieuLQ on 8/24/2017.
 */


module.exports = function producer_client(sails) {

	var kafka = require('kafka-node');

	return {
		sendMsg: function (topic, messageData) {

			var addressKafkaServer = sails.config.pubsub.address;
			var HighLevelProducer = kafka.HighLevelProducer;
			var KeyedMessage = kafka.KeyedMessage;
			var Client = kafka.Client;

			var client = new Client(addressKafkaServer, 'my-client-id', {
				sessionTimeout: 300,
				spinDelay: 100,
				retries: 2
			});

			client.on('error', function (error) {
				console.error(error);
			});

			var producer = new HighLevelProducer(client);

			producer.on('ready', function () {
				var payload = [{
					topic: topic,
					messages: JSON.stringify(messageData),
				}];

				producer.send(payload, function (error, result) {
					if (error) {
						console.error(error);
					}
				});
			});

			producer.on('error', function (err) {
				console.error("error message " + err);
			})
		}

	};


};

