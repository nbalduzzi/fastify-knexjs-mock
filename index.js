'use strict'

const fastifyPlugin = require('fastify-plugin')
const knex = require('knex')
const mockKnex = require('mock-knex')

const fastifyKnexJSMock = (fastify, opts, next) => {
  try {
    const db = knex(opts)
    const handler = {
      tracker: mockKnex.getTracker(),
      mock: () => mockKnex(db),
      unmock: () => mockKnex.unmock(db)
    }

    fastify.decorate('knex', handler)
    next()
  } catch (err) {
    next(new Error(err))
  }
}

module.exports = fastifyPlugin(fastifyKnexJSMock, '>=0.30.0')
