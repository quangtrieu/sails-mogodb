/**
 * Created by TrieuLQ on 31/07/2017
 * Description : Server-side logic for managing Activity
 */

module.exports = {
	getActivities: (req, res) => {
		let perPage = req.param('perPage');
		let page = req.param('page');

		ActivityService.getActivities(parseInt(perPage), parseInt(page))
			.then(data => {
				res.ok(data);
			});
	},

	getActivitiesNoPaging: (req, res) => {
		ActivityService.getActivitiesNoPaging()
			.then(data => {
				res.ok(data);
			})
			.catch(err => {
				console.log(err);
			});
	},

	createActivity: (req, res) => {
		let activity = req.body;
		if (activity) {
			ActivityService.createActivity(activity)
				.then(data => {
					res.ok(data);
				})
				.catch(err => {
					res.serverError(err.originalError);
				});
		}
		else {
			res.badRequest();
		}
	},

	updateActivity: (req, res) => {
		let activity = req.body;
		if (activity) {
			ActivityService.updateActivity(activity)
				.then(data => {
					res.ok(data);
				})
				.catch(err => {
					res.serverError(err.originalError);
				});
		}
		else {
			res.badRequest();
		}
	},

	deleteActivity: (req, res) => {
		let id = req.param('id');
		if (id) {
			ActivityService.deleteActivity(id)
				.then((data) => {
					res.ok(data);
				});
		}
		else {
			res.badRequest();
		}
	}
};

