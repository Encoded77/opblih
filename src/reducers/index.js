const { combineReducers } = require('redux')

const routeReducer = require('./routeReducer')
const userReducer = require('./userReducer') 
const sshReducer = require('./sshReducer')
const repoReducer = require('./repoReducer')
const aclReducer = require('./aclReducer')

module.exports = combineReducers({
  route: routeReducer,
  user: userReducer,
  ssh: sshReducer,
  repo: repoReducer,
  acl: aclReducer
})