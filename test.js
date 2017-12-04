const fastify = require('fastify')()
const tap = require('tap')
const fastifyKnexJSMock = require('./index')

tap.test('fastify.tracker should exist', test => {
  test.plan(2)

  fastify.register(fastifyKnexJSMock, { client: 'mysql' })

  fastify.ready(err => {
    test.error(err)
    test.ok(fastify.tracker)

    fastify.close(() => test.end())
  })
})
