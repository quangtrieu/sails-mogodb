/**
 * Created by TrieuLQ on 31/07/2017
 * Description : Server-side logic for managing Scope
 */

module.exports = {
	getScopes: (req, res) => {
		let perPage = req.param('perPage');
		let page = req.param('page');

		ScopeService.getScopes(parseInt(perPage), parseInt(page))
			.then(data => {
				res.ok(data);
			});
	},

	getAllScopes: (req, res) => {
		ScopeService.getAllScopes().then(data => {
			res.ok(data);
		}).catch(err => {
			res.serverError(err);
		})
	},

	createScope: (req, res) => {
		let scope = req.body;
		if (scope && scope.scopeName) {
			ScopeService.createScope(scope)
				.then(data => {
					res.ok(data);
				})
				.catch(err => {
					res.serverError(err.invalidAttributes.scopeName["0"].message);
				});
		}
		else {
			res.badRequest();
		}
	},

	updateScope: (req, res) => {
		let scope = req.body;
		if (scope) {
			ScopeService.updateScope(scope)
				.then(data => {
					res.ok(data);
				})
				.catch(err => {
					res.serverError(err.invalidAttributes.scopeName["0"].message);
				});
		}
		else {
			res.badRequest();
		}
	},

	deleteScope: (req, res) => {
		let id = req.param('id');
		if (id) {
			ScopeService.deleteScope(id)
				.then((data) => {
					res.ok(data);
				});
		}
		else {
			res.badRequest();
		}
	}
};

