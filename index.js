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

			// store: redisStore({})
			strapi.app.keys = ['keys', 'keykeys'];
			strapi.app.use(session({
			}));
			console.log("initialized strapi-generic-session");

			cb();
		}
	};

	return hook;
};
