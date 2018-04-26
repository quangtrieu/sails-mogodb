/**
 * Created by TrieuLQ on 31/07/2017
 * Description:
 */

module.exports = {
	getActivities: (perPage, page) => {
		return new Promise((resolve, reject) => {
			Activity.pagify('activities', {
				findQuery: {},
				page: page,
				perPage: perPage
			})
				.then(data => {
					resolve(data);
				})
				.catch(err => {
					reject(err);
				})
		});
	},

	getActivitiesNoPaging: () => {
		return new Promise((resolve, reject) => {
			Activity.find({}, { select: ['url', 'method', 'urlRegex'] })
				.then(data => {
					resolve(data);
				})
				.catch(err => {
					reject(err);
				})
		});
	},

	updateActivity: (model) => {
		return new Promise((resolve, reject) => {
			Activity.update({ id: model.id }, model)
				.then(data => {
					resolve(data);
				})
				.catch(err => {
					reject(err);
				});
		});
	},

	deleteActivity: (id) => {
		return new Promise((resolve, reject) => {
			Activity.destroy({ id: id })
				.then(data => {
					resolve(data);
				})
				.catch(err => {
					reject(err);
				})
		});
	},

	createActivity: (model) => {
		return new Promise((resolve, reject) => {
			Activity.create(model)
				.then(data => {
					resolve(data);
				})
				.catch(err => {
					reject(err);
				});
		});
	}
};