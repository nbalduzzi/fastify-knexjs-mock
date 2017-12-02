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
  console.log(fastify.knex) // Knex DB Mocked instance
  console.log(fastify.tracker) // Knex DB Mocked tracker
})
```

## Structure

Fastify knexJS Mock structure:
```
{
  tracker, // Attribute: Have the mock-knex tracker instance
  mock, // Method: Mock the db instance selected
  unmock // Method: Unmock the db instance selected
}
```

## Options

KnexJS Mock DB configuration JSON object.

https://github.com/colonyamerican/mock-knex

## Version

v1.0.0

## Author

[Nicolás Balduzzi](nico.balduzzi@gmail.com)

## License

Licensed under [MIT](./LICENSE).
