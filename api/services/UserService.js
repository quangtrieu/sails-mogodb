/**
 * Created by TrieuLQ on 8/1/2017.
 */


module.exports = {
	getUsers: function (pageCurrent, limit, criterial) {
		return new Promise((resolve, reject) => {
			User.find(criterial)
				.sort('updatedAt DESC').paginate({
					page: pageCurrent,
					limit: limit
				}).then(data => {
					resolve(data);
				}).catch(err => {
					reject(err);
				});
		});
	},

	countTotalUser: function (criterial) {
		return new Promise((resolve, reject) => {
			User.count(criterial).then((found) => {
				resolve(found);
			}).catch(err => {
				reject(err);
			});
		});
	},

	updateUser: function (user) {
		return new Promise((resolve, reject) => {
			User.update({ id: user.id }, {
				fullName: user.fullName,
				email: user.email,
				password: user.password,
				roles: user.roles,
				company: user.company,
				location: user.location
			}).then(data => {
				resolve(data);
			}).catch(err => {
				reject(err);
			});
		});
	},

	deleteUser: function (id) {
		return new Promise((resolve, reject) => {
			User.destroy({ id: id }).then(data => {
				resolve();
			});
		});
	},

	createUser: function (user) {
		return new Promise((resolve, reject) => {
			User.create(user).then(data => {
				resolve(data);
			}).catch(err => {
				reject(err);
			});
		});
	},

	findOneUser: function (id) {
		return new Promise((resolve, reject) => {
			User.findOne({ id: id }).then((user) => {
				resolve(user);
			}).catch((err) => {
				reject(err);
			});
		});
	},

	updateCompanyUser: function (companyMsg) {
		console.log('du lieu updata service', JSON.stringify(companyMsg));
		return new Promise((resolve, reject) => {
			User.update({ 'company.companyId': companyMsg.companyId }, { 'company.companyName': companyMsg.companyName })
				.then(user => {
					resolve(user);
				}).catch(err => {
					reject(err);
				});
		});
	},

	deleteCompanyUser: function (idCompany) {
		console.log('du lieu delete service', idCompany);
		return new Promise((resolve, reject) => {
			User.update({ 'company.companyId': idCompany }, { company: '' })
				.then(user => {
					resolve(user);
				}).catch(err => {
					reject(err);
				});
		});
	},

	findRolesByUser: function (userId) {
		let data = {};
		return new Promise((resolve, reject) => {
			User.find({ id: userId }, {
				fields:
					['id', 'fullName', 'email', 'roles', 'company', 'userType']
			}).then(users => {
				users = users[0];
				data.user = users;
				return users.roles.roleId;

			}).then(rolesArr => {
				return new Promise((resoleRole, reject) => {
					Role.find({ id: rolesArr }, { fields: ['id', 'name'] })
						.populate('scopes', { select: ['id', 'scopeName'] }).then(roles => {
							data.roles = roles;
							let scopeIds = [];
							_.forEach(roles, role => {
								_.forEach(role.scopes, scope => {
									scopeIds.push(scope.id);
								})
							});
							resoleRole(scopeIds);
						});
				}).catch(err => {
					throw err;
				});
			}).then(scopeIds => {
				return new Promise((resolveScope, rejectScope) => {
					Scope.find({ id: scopeIds }, { fields: ['id', 'scopeName'] })
						.populate('activities', { select: ['id', 'url', 'method'] }).then(scopes => {
							data.scopes = scopes;
							resolve(data);
						}).catch(err => {
							throw err;
						});
				});
			}).catch(err => {
				reject(err);
			});
		});
	}
};