const configstore = require('../config/config')
const config = configstore.getConfig()
const Blih = require('blih')

exports.createBlihInstance = (email, password) => {
  return new Blih({email, password})
}