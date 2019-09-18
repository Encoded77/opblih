const { combineReducers } = require('redux')

const routeReducer = require('./routeReducer')
const userReducer = require('./userReducer') 
const sshReducer = require('./sshReducer')

module.exports = combineReducers({
  route: routeReducer,
  user: userReducer,
  ssh: sshReducer
})