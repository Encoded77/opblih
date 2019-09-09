'use strict'

const Configstore = require('configstore')
const conf = new Configstore('opblih')

exports.getConfig = function getConfig () {
  return conf
}

exports.addConfig = function addConfig (name, value) {
  conf.set(name, value)
}

exports.deleteConfig = function deleteConfig (name) {
  conf.delete(name)
}