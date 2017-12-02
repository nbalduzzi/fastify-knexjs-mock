const fastify = require('fastify')()
const tap = require('tap')
const fastifyKnexJSMock = require('./index')

tap.test('fastify.knex and fastify.knex.tracker should exist', test => {
  test.plan(3)

  fastify.register(fastifyKnexJSMock, {
    client: 'mysql'
  })

  fastify.ready(err => {
    test.error(err)
    test.ok(fastify.knex)
    test.ok(fastify.knex.tracker)
    test.end()

    fastify.close()
  })
})
