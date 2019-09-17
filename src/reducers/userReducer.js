'use strict'
const configstore = require('../../config/config')
const config = configstore.getConfig()

module.exports = function(state = {
  email: config.get('mail'),
  password: config.get('password')
}, action){

  switch (action.type){
    case 'SET_USER': {
      const { email, password } = action.payload
      config.set('mail', email)
      config.set('password', password)
      return state = { ...state, email, password }
    }
    case 'DELETE_USER': {
      config.set('mail', undefined)
      config.set('password', undefined)
      return state = { ...state, email: undefined, password: undefined }
    }
  }

  return state
}