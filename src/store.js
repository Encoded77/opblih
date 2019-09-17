const { applyMiddleware, createStore } = require('redux')

// Middlewares
const thunk = require('redux-thunk').default
const promise = require('redux-promise-middleware').default
const logger = require('redux-logger').default

const reducer = require('./reducers')

module.exports = createStore(reducer, applyMiddleware(promise, thunk))