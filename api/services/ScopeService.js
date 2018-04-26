/**
 * Created by TrieuLQ on 31/07/2017
 * Description:
 */

module.exports = {
	getScopes: (perPage, page) => {
		return new Promise((resolve, reject) => {
			Scope.pagify('scopes', {
				findQuery: {},
				populate: ['activities'],
				page: page,
				perPage: perPage
			})
				.then(data => {
					resolve(data);
				})
				.catch(err => {
					reject(err);
				});
		});
	},

	getAllScopes: () => {
		return new Promise((resolve, reject) => {
			Scope.find().then(data => {
				resolve(data);
			})
				.catch(err => {
					reject(err);
				});
		})
	},


	updateScope: (model) => {
		let updateData = {};
		if (model.scopeName) {
			updateData.scopeName = model.scopeName;
		}

		updateData.description = model.description;

		if (model.activities) {
			updateData.activities = model.activities;
		}

		return new Promise((resolve, reject) => {
			Scope.update({ id: model.id }, updateData)
				.then(data => {
					resolve(data);
				})
				.catch(err => {
					reject(err);
				});
		});
	},

	deleteScope: (id) => {
		return new Promise((resolve, reject) => {
			Scope.destroy({ id: id })
				.then(data => {
					resolve(data);
				})
				.catch(err => {
					reject(err);
				})
		});
	},

	createScope: (model) => {
		return new Promise((resolve, reject) => {
			Scope.create(model)
				.then(data => {
					resolve(data);
				})
				.catch(err => {
					reject(err);
				});
		});
	},

	findScopes: (scopeIds) => {
		return new Promise((resolve, reject) => {
			Scope.find({ id: { '!': scopeIds } }).then((scope) => {
				resolve(scope);
			}).catch((err) => {
				reject(err);
			})
		});
	},

};