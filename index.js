'use strict'

const fastifyPlugin = require('fastify-plugin')
const knex = require('knex')
const mockKnex = require('mock-knex')

function fastifyKnexJSMock (fastify, opts, next) {
  const { client, connection } = opts

  const db = knex({ client, connection })
  const mocked = knex({ client })

  try {
    mockKnex.mock(mocked)

    fastify.decorate('knex', db)
    fastify.decorate('tracker', mockKnex.getTracker())

    next()
  } catch (err) {
    next(err)
  }

  fastify.addHook('onClose', function (instance, done) {
    try {
      mockKnex.unmock(mocked)
      fastify.tracker.uninstall()
      db.destroy(done)
    } catch (err) {
      done(err)
    }
  })
}

module.exports = fastifyPlugin(fastifyKnexJSMock, '>=0.30.0')
