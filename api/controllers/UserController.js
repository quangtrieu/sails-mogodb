/**
 * Created by TrieuLQ on 25/07/2017
 * Description : Server-side logic for managing Users
 */

module.exports = {
	getUsers: function (req, res) {

		let pageCurrent = req.param('page');
		let limit = req.param('limit');
		let objCriteria = req.param('criteria');

		let criterial = {};
		let dataReturn = {};

		if (objCriteria !== 'undefined') {
			let dataParse = JSON.parse(objCriteria);

			if (dataParse.userType) {
				criterial['userType'] = dataParse.userType;
			}

			if (dataParse.companyId) {
				criterial['company.companyId'] = dataParse.companyId;
			}

			if (dataParse.role) {
				criterial['roles.roleId'] = dataParse.role;
			}

			if (dataParse.fullName) {
				criterial['or'] = [];
				criterial['or'].push(
					{ fullName: { like: '%' + dataParse.fullName + '%' } },
					{ email: { like: '%' + dataParse.fullName + '%' } }
				)
			}
		}

		Promise.all([
			UserService.getUsers(pageCurrent, limit, criterial),
			UserService.countTotalUser(criterial)
		]).then(([users, userCount]) => {

			dataReturn.data = users;
			dataReturn.total = userCount;
			return res.ok(dataReturn);

		}).catch((err) => {
			throw err
		});
	},

	createUser: function (req, res) {

		UserService.createUser(req.body).then(data => {
			if (req.body.company) {
				let msgData = {
					idUser: data.id,
					email: data.email,
					fullName: data.fullName,
					companyId: req.body.company.companyId,
					companyName: req.body.company.companyName
				};
				let topicName = sails.config.pubsub.producer.user_update;
				sails.hooks.producer_client.sendMsg(topicName, msgData);
			}
			res.ok(data);
		}).catch(err => {
			console.log('error', err);
			res.serverError(sails.config.message.customError(err));
		})
	},

	updateUser: function (req, res) {
		UserService.updateUser(req.body).then(data => {

			if (req.body.company) {
				let msgData = {
					idUser: data[0].id,
					email: data[0].email,
					fullName: data[0].fullName,
					companyId: req.body.company.companyId,
					companyName: req.body.company.companyName
				};
				let topicName = sails.config.pubsub.producer.user_update;
				sails.hooks.producer_client.sendMsg(topicName, msgData);
			}
			res.ok(data);
		}).catch(err => {
			res.serverError(sails.config.message.customError(err));
		})
	},

	deleteUser: function (req, res) {
		if (!req.param('id')) {
			return res.badRequest('Data is required');
		}
		UserService.deleteUser(req.param('id')).then(data => {
			let topicName = sails.config.pubsub.producer.user_delete;
			let msg = {};
			msg.userId = req.param('id');
			sails.hooks.producer_client.sendMsg(topicName, msg);

			res.ok(data);
		}).catch(err => {
			res.serverError(err);
		})
	},

	findOneRole: function (req, res) {
		if (!req.param('id')) {
			return res.badRequest('Data is required');
		}
		UserService.findOneUser(req.param('id')).then(data => {
			res.ok(data);
		}).catch(err => {
			res.serverError(err);
		})
	},

	singUp: (req, res) => {
		let email = req.param('email');
		let password = req.param('password');
		User.findOne({ email: email }).exec((err, user) => {
			if (!user) {
				return res.badRequest();
			}

			User.comparePassword(password, user, (err, valid) => {
				if (err) {
					return res.badRequest();
				}

				if (!valid) {
					return res.badRequest(400);
				} else {

					// call service get data from service another
					UserService.findRolesByUser(user.id).then(user => {
						return res.json(user);
					}).catch(err => {
						return res.serverError(err);
					});
				}
			});
		})
	},

	findRoleByUser: (req, res) => {
		if (!req.param('userId')) {
			return res.json({});
		}

		UserService.findRolesByUser(req.param('userId')).then((roles) => {
			return res.json(roles);
		}).catch(err => {
			sails.log(err);
			return null;
		});
	}
};
