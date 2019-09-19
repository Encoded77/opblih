const store = require('../store')
const {createBlihInstance} = require('../utils')

exports.fetchAcl = (repo) => {
  return (dispatch) => {
    const { email, password } = store.getState().user
    const blih = createBlihInstance(email, password)

    dispatch({type: 'FETCH_ACL_STARTED', payload: repo})
    blih.getACL(repo)
      .then(res => {
        dispatch({type: 'FETCH_ACL_FULLFILLED', payload: res, repo: repo})
      })
      .catch(err => {
        dispatch({type: 'FETCH_ACL_ERROR', payload: err})
      })
  }
}

exports.resetFetchAclState = () => {
  return {type: 'RESET_FETCH_ACL_STATE'}
}

exports.setAcl = (repo, user, acl) => {
  return (dispatch) => {
    const { email, password } = store.getState().user
    const blih = createBlihInstance(email, password)

    dispatch({type: 'ADD_ACL_STARTED'})
    blih.setACL(repo, user, acl)
      .then(res => {
        dispatch({type: 'ADD_ACL_FULLFILLED', payload: res})
      })
      .catch(err => {
        dispatch({type: 'ADD_ACL_ERROR', payload: err})
      })
  }
}

exports.resetAddAclState = () => {
  return {type: 'RESET_ADD_ACL_STATE'}
}