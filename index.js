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
			strapi.app.keys = ['keys', 'keykeys'];
			let config = strapi.config.genericSession;

			var store = redisStore({
				host: config.host,
				port: config.port
			});
			strapi.app.use(session({
				store: store
			}));
			strapi.log.info(`initialized strapi-generic-session`);

			store.on('ready', () => {
				console.log(`Successfully connected to Redis at ${config.host}:${config.port}`);
			});

			store.on('error', () => {
				strapi.log.error(`Error while trying to connect to Redis at ${config.host}:${config.port}`);
			});

			cb();
		}
	};

	return hook;
};
