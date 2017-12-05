const fastify = require('fastify')()
const tap = require('tap')
const fastifyKnexJSMock = require('./index')

tap.test('fastify.knex and fastify.tracker should exist', test => {
  test.plan(3)

  fastify.register(fastifyKnexJSMock, { client: 'mysql' })

  fastify.ready(err => {
    test.error(err)
    test.ok(fastify.knex)
    test.ok(fastify.tracker)

    fastify.close(() => test.end())
  })
})
