'use strict'

const fastifyPlugin = require('fastify-plugin')
const knex = require('knex')
const mockKnex = require('mock-knex')

function fastifyKnexJSMock (fastify, opts, next) {
  const db = knex(opts)
  mockKnex.mock(db)

  fastify.decorate('tracker', mockKnex.getTracker())
  next()

  fastify.addHook('onClose', function (instance, done) {
    mockKnex.unmock(db)
    done()
  })
}

module.exports = fastifyPlugin(fastifyKnexJSMock, '>=0.30.0')
