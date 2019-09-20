module.exports = function(state = {
  acl: {
    loading: false,
    error: false,
    acl: undefined,
    repo: undefined
  }, 
  add: {
    loading: false,
    error: false,
    res: undefined
  }
}, action){
  switch (action.type) {
    // ACL FETCH
    case 'FETCH_ACL_STARTED': return state = {...state, acl: {loading: true, error: undefined, acl: undefined, repo: action.payload}}
    case 'FETCH_ACL_FULLFILLED': return state = {...state, acl: {loading: false, acl: action.payload, repo: action.repo}}
    case 'FETCH_ACL_ERROR': return state = {...state, acl: {loading: false, error: action.payload}}
    case 'RESET_FETCH_ACL_STATE': return state = {...state, acl: {loading: false, error: undefined, acl: undefined}}
    

    // ADD ACL
    case 'ADD_ACL_STARTED': return state = {...state, add: {loading: true, error: undefined, res: undefined}}
    case 'ADD_ACL_FULLFILLED': return state = {...state, add: {loading: false, res: action.payload}}
    case 'ADD_ACL_ERROR': return state = {...state, add: {loading: false, error: action.payload}}
    case 'RESET_ADD_ACL_STATE':  return state = {...state, add: {loading: false, error: undefined, res: undefined}}
 
  }

  return state
}
