module.exports = function(state= {
  list: {
    loading: false,
    repos: undefined,
    error: undefined
  },
  add: {
    loading: false,
    response: undefined,
    error: undefined
  },
  delete: {
    loading: false,
    response: undefined,
    error: undefined
  },
  info: {
    loading: false,
    info: undefined,
    error: undefined
  }
}, action){
  switch (action.type) {
    // FETCH REPOS
    case 'FETCH_REPOS_STARTED': return state = {...state, list: {
      loading: true, repos: undefined, error: undefined
    }}

    case 'FETCH_REPOS_FULLFILLED': return state = {...state, list: {
      loading: false, repos: action.payload
    }}

    case 'FETCH_REPOS_ERROR': return state = {...state, list: {
      loading: false, error: action.payload
    }}

    case 'RESET_LIST_REPOS_STATE': return state = {...state, list: {
      loading: false,
      repos: undefined,
      error: undefined
    }}

    // ADD REPO
    case 'ADD_REPO_STARTED': return state = {...state, add: {
      loading: true, response: undefined, error: undefined
    }}

    case 'ADD_REPO_FULLFILLED': return state = {...state, add: {
      loading: false, response: action.payload
    }}

    case 'ADD_REPO_ERROR': return state = {...state, add: {
      loading: false, error: action.payload
    }}

    case 'RESET_ADD_REPO_STATE': return state = {...state, add: {
      loading: false,
      response: undefined,
      error: undefined
    }}

    // DELETE REPO
    case 'DELETE_REPO_STARTED': return state = {...state, delete: {
      loading: true, response: undefined, error: undefined
    }}

    case 'DELETE_REPO_FULLFILLED': return state = {...state, delete: {
      loading: false, response: action.payload
    }}

    case 'DELETE_REPO_ERROR': return state = {...state, delete: {
      loading: false, error: action.payload
    }}

    case 'RESET_DELETE_REPO_STATE': return state = {...state, delete: {
      loading: false,
      response: undefined,
      error: undefined
    }}

    // REPO INFO
    case 'FETCH_REPO_INFO_STARTED': return state = {...state, info: {
      loading: true, info: undefined, error: undefined
    }}

    case 'FETCH_REPO_INFO_FULLFILLED': return state = {...state, info: {
      loading: false, info: action.payload
    }}

    case 'FETCH_REPO_INFO_ERROR': return state = {...state, info: {
      loading: false, error: action.payload
    }}

    case 'RESET_REPO_INFO_STATE': return state = {...state, info: {
      loading: false,
      info: undefined,
      error: undefined
    }}
  }

  return state
}