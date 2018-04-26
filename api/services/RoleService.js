/**
 * Created by TrieuLQ on 8/1/2017.
 */


module.exports = {
	getRoles: function () {
		return new Promise((resolve, reject) => {
			Role.find().populate('scopes', { select: ['scopeName', 'id'] }).sort('updatedAt DESC')
				.then(data => {
					resolve(data);
				}).catch(err => {
					reject(err);
				});
		});
	},


	updateRole: function (role) {
		return new Promise((resolve, reject) => {
			Role.update({ id: role.id }, role)
				.then(data => {
					resolve(data);
				}).catch(err => {
					reject(err);
				});
		});
	},

	findOneRole: function (id) {
		return new Promise((resolve, reject) => {
			Role.findOne({ id: id }).populate('scopes', { select: ['scopeName', 'id'] }).then((role) => {
				resolve(role);
			}).catch((err) => {
				reject(err);
			});
		});
	},

	deleteRole: function (id) {
		return new Promise((resolve, reject) => {
			Role.destroy({ id: id }).then(data => {
				resolve();
			});
		});
	},

	createRole: function (role) {
		return new Promise((resolve, reject) => {
			Role.create(role).then(data => {
				resolve(data);
			}).catch(err => {
				reject(err);
			});

		});
	},
};
