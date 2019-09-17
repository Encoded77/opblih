const { combineReducers } = require('redux')

const routeReducer = require('./routeReducer')
const userReducer = require('./userReducer') 

module.exports = combineReducers({
  route: routeReducer,
  user: userReducer
})