# Fastify KnexJS Mock Plugin

[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
[![Build Status](https://travis-ci.org/chapuletta/fastify-knexjs-mock.svg?branch=master)](https://travis-ci.org/chapuletta/fastify-knexjs-mock)

## Installation

```
npm install fastify-knexjs-mock --save
```

## Usage

```
fastify.register(require('fastify-knexjs-mock'), options, err => console.error(err))

fastify.get('/', (request, reply) => {
  console.log(fastify.knex) // Knex DB instance
  console.log(fastify.tracker) // Knex DB Mocked tracker
})
```

## Options

KnexJS Mock DB configuration JSON object.

https://github.com/colonyamerican/mock-knex

## Test example

```
const { test } = require('tap')
const { fastify } = require('./app')

fastify.ready(() => {
  fastify.tracker.install()

  test('GET 200 `/users` route', async t => {
    t.plan(2)

    fastify.tracker.on('query', query => query.response([{
      id: 1,
      name: 'Test',
      lastname: 'Test',
      email: 'test@example.com'
    }]))

    try {
      const { statusCode, payload } = await fastify.inject({
        method: 'GET',
        url: '/users'
      })

      t.equal(statusCode, 200)
      t.same(JSON.parse(payload)[0].email, 'test@example.com')
    } catch (err) {
      t.error(err)
    } finally {
      fastify.close(() => t.end())
    }
  })
})
```

## Author

[Nicolás Balduzzi](nico.balduzzi@gmail.com)

## License

Licensed under [MIT](./LICENSE).
