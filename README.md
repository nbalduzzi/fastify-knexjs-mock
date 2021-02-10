# Fastify KnexJS Mock Plugin

![Test](https://github.com/nbalduzzi/fastify-knexjs-mock/workflows/Test/badge.svg)
![Semantic Release](https://github.com/nbalduzzi/fastify-knexjs-mock/workflows/Semantic%20Release/badge.svg)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

[![NPM](https://nodei.co/npm/fastify-knexjs-mock.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/fastify-knexjs-mock/)

## Installation

```bash
npm install fastify-knexjs-mock --save
```

## Usage

```bash
fastify.register(require('fastify-knexjs-mock'), options, err => console.error(err))

fastify.get('/', (request, reply) => {
  console.log(fastify.knex) // Knex DB instance
  console.log(fastify.tracker) // Knex DB Mocked tracker
})
```

## Options

KnexJS Mock DB configuration JSON object.

<https://github.com/colonyamerican/mock-knex>

## Test example

```javascript
const { test } = require('tap')
const { fastify } = require('./app')

fastify.ready(() => {
  fastify.tracker.install()

  test('GET 200 `/users` route', async t => {
    t.plan(2)

    fastify.tracker.on('query', (query) => query.response([{
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
