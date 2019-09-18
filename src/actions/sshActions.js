const store = require('../store')
const {createBlihInstance} = require('../utils')

exports.fetchSshKeys = () => {
  return function(dispatch){
    const { email, password } = store.getState().user
    const blih = createBlihInstance(email, password)
    dispatch({type: 'FETCH_SSH_KEYS_STARTED'})
    blih.listKeys()
      .then((keys) => {
        dispatch({type: 'FETCH_SSH_KEYS_FULLFILLED', payload: keys})
      })
      .catch((err) =>{
        dispatch({type: 'FETCH_SSH_KEYS_ERROR', payload: err})
      })
  }
}

exports.resetSshListState = () => {
  return {
    type: 'RESET_SSH_LIST_STATE'
  }
}

exports.addSshKey = (key) => {
  return function(dispatch){
    const { email, password } = store.getState().user
    const blih = createBlihInstance(email, password)

    dispatch({type: 'ADD_SSH_STARTED'})
    blih.uploadKey(key)
      .then((res) => {
        dispatch({type: 'ADD_SSH_FULLFILLED', payload: res})
      })
      .catch((err) =>{
        dispatch({type: 'ADD_SSH_ERROR', payload: err})
      })
  }
}

exports.resetSshAddState = () => {
  return {
    type: 'RESET_SSH_ADD_STATE'
  }
}

exports.deleteSshKey = (key) => {
  return function(dispatch){
    const { email, password } = store.getState().user
    const blih = createBlihInstance(email, password)

    dispatch({type: 'DELETE_SSH_STARTED'})
    blih.deleteKey(key)
      .then((res) => {
        dispatch({type: 'DELETE_SSH_FULLFILLED', payload: res})
      })
      .catch((err) =>{
        dispatch({type: 'DELETE_SSH_ERROR', payload: err})
      })
  }
}

exports.resetSshDeleteState = () => {
  return {
    type: 'RESET_SSH_DELETE_STATE'
  }
}