'use strict'

const session = require('koa-generic-session')
const redisStore = require('koa-redis')

/**
 * Strapi session hook
 */
module.exports = function (strapi) {
  var store
  const hook = {

    /**
    * Default options
    */

    defaults: {
      genericSession: {
        type: 'memory'
      }
    },

    /**
     * Initialize the hook
     */

    initialize: function (cb) {
      strapi.app.keys = ['keys', 'keykeys']
      let config = strapi.config.genericSession

      switch (config.type) {
      case 'redis':
        store = redisStore({
          host: config.host,
          port: config.port
        })
        
        store.on('ready', () => {
          strapi.log.info(`Successfully connected to Redis at ${config.host}:${config.port}`)
        })

        store.on('error', () => {
          strapi.log.error(`Error while trying to connect to Redis at ${config.host}:${config.port}`)
        })
        
      default:
        store = session.MemoryStore()
        strapi.log.info(`Connected to default memory store`)
      }
      
      strapi.app.use(session({
        store
      }))
      strapi.log.info(`initialized strapi-generic-session`)

      cb()
    }
  }

  return hook
}
