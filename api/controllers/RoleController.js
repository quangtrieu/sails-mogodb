/**
 * Created by TrieuLQ on 7/31/2017.
 */

module.exports = {
	getRoles: function (req, res) {
		return RoleService.getRoles().then(data => {
			res.ok(data);
		}).catch(err => {
			res.serverError(err);
		})
	},

	createRole: function (req, res) {
		RoleService.createRole(req.body).then(data => {
			res.ok(data);
		}).catch(err => {
			res.serverError(sails.config.message.customError(err));
		})
	},

	findOneRole: function (req, res) {
		if (!req.param('id')) {
			return res.badRequest();
		}

		Promise.all([
			RoleService.findOneRole(req.param('id')),
			ScopeService.getAllScopes()
		]).then(([roles, scopes]) => {
			return res.ok({ roles: roles, scopes: scopes });
		}).catch((err) => {
			throw err
		});
	},

	updateRole: function (req, res) {
		let updateData = {};
		updateData.roleName = req.body.roleName;
		updateData.roleType = req.body.roleType;
		updateData.description = req.body.description;
		updateData.id = req.body.id;
		if (req.body.scopes) {
			updateData.scopes = req.body.scopes;
		}

		RoleService.updateRole(updateData).then(data => {
			res.ok(data);
		}).catch(err => {
			res.serverError(sails.config.message.customError(err));
		})
	},

	deleteRole: function (req, res) {
		if (!req.param('id')) {
			return res.badRequest();
		}

		RoleService.deleteRole(req.param('id')).then(data => {
			res.ok(data);
		}).catch(err => {
			res.serverError(err);
		})
	},
};

