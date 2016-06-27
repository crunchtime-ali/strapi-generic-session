'use strict';

const session = require('koa-generic-session');
const redisStore = require('koa-redis');
/**
 * Strapi session hook
 */

module.exports = function (strapi) {
	const hook = {

		/**
		* Default options
		*/

		defaults: {},

		/**
		 * Initialize the hook
		 */

		initialize: function (cb) {

			strapi.app.keys = ['keys', 'keykeys'];
			strapi.app.use(session({
				store: redisStore({
				})
			}));
			console.log("initialized strapi-generic-session");

			cb();
		}
	};

	return hook;
};
