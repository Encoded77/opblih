module.exports = function(state = {
  list: {
    loading: false,
    error: undefined,
    keys: undefined
  },
  add: {
    loading: false,
    error: undefined,
    response: undefined
  },
  delete: {
    loading: false,
    error: undefined,
    response: undefined
  }
 
}, action){
  // TODO:
  // - Do something with error cases
  switch (action.type){
    // SSH KEYS FETCH
    case 'FETCH_SSH_KEYS_STARTED':{
      return state = {...state, list:{
        loading: true, response: undefined, error: undefined
      }}
    }

    case 'FETCH_SSH_KEYS_FULLFILLED': {
      return state = {...state, list: {
        keys: action.payload, loading: false
      }}
    }

    case 'FETCH_SSH_KEYS_ERROR': {
      return state = {...state, list: {
        error: action.payload, loading: false
      }}
    }

    case 'RESET_SSH_LIST_STATE': {
      return state = {...state, list: {
        loading: false,
        error: undefined,
        keys: undefined
      }}
    }

    // ADD A SSH KEY
    case 'ADD_SSH_STARTED':{
      return state = {...state, add: {
        loading: true, response: undefined, error: undefined
      }}
    }

    case 'ADD_SSH_FULLFILLED': {
      return state = {...state, add: {
        response: action.payload, loading: false
      }}
    }

    case 'ADD_SSH_ERROR': {
      return state = {...state, add: {
        error: action.payload, loading: false
      }}
    }

    case 'RESET_SSH_ADD_STATE': {
      return state = {...state, add: {
        loading: false,
        error: undefined,
        response: undefined
      }}
    }

    //DELETE SSH KEY
    case 'DELETE_SSH_STARTED':{
      return state = {...state, delete: {
        loading: true, response: undefined, error: undefined
      }}
    }

    case 'DELETE_SSH_FULLFILLED': {
      return state = {...state, delete: {
        response: action.payload, loading: false
      }}
    }

    case 'DELETE_SSH_ERROR': {
      return state = {...state, delete: {
        error: action.payload, loading: false
      }}
    }

    case 'RESET_SSH_DELETE_STATE': {
      return state = {...state, delete: {
        loading: false,
        error: undefined,
        response: undefined
      }}
    }
  }

  return state
}