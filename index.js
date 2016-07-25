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

		defaults: {
			genericSession: {
				host: 'localhost',
				port: 6379
			}
		},


		/**
		 * Initialize the hook
		 */

		initialize: function (cb) {

			// store: redisStore({})
			strapi.app.keys = ['keys', 'keykeys'];
			let config = strapi.config.genericSession;
			debugger;
			strapi.app.use(session({
				store: redisStore({
					host: config.host,
					port: config.port
				})
			}));
			console.log("initialized strapi-generic-session");

			cb();
		}
	};

	return hook;
};
