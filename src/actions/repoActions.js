const store = require('../store')
const {createBlihInstance} = require('../utils')

exports.fetchRepos = () => {
  return function(dispatch){
    const { email, password } = store.getState().user
    const blih = createBlihInstance(email, password)
    dispatch({type: 'FETCH_REPOS_STARTED'})
    blih.listRepositories()
      .then((repos) => {
        dispatch({type: 'FETCH_REPOS_FULLFILLED', payload: repos})
      })
      .catch((err) =>{
        dispatch({type: 'FETCH_REPOS_ERROR', payload: err})
      })
  }
}

exports.resetListReposState = () => {
  return({
    type: 'RESET_LIST_REPOS_STATE'
  })
}

exports.createRepo = (repo) => {
  return function(dispatch){
    const { email, password } = store.getState().user
    const blih = createBlihInstance(email, password)

    dispatch({type: 'ADD_REPO_STARTED'})
    blih.createRepository(repo)
      .then((res) => {
        dispatch({type: 'ADD_REPO_FULLFILLED', payload: res})
      })
      .catch((err) =>{
        dispatch({type: 'ADD_REPO_ERROR', payload: err})
      })
  }
}

exports.resetAddRepoState = () => {
  return({
    type: 'RESET_ADD_REPO_STATE'
  })
}

exports.deleteRepo = (repo) => {
  return function(dispatch){
    const { email, password } = store.getState().user
    const blih = createBlihInstance(email, password)

    dispatch({type: 'DELETE_REPO_STARTED'})
    blih.deleteRepository(repo)
      .then((res) => {
        dispatch({type: 'DELETE_REPO_FULLFILLED', payload: res})
      })
      .catch((err) =>{
        dispatch({type: 'DELETE_REPO_ERROR', payload: err})
      })
  }
}

exports.resetDeleteRepoState = () => {
  return({
    type: 'RESET_DELETE_REPO_STATE'
  })
}

exports.fetchRepoInfo = (repo) => {
  return function(dispatch){
    const { email, password } = store.getState().user
    const blih = createBlihInstance(email, password)

    dispatch({type: 'FETCH_REPO_INFO_STARTED'})
    blih.repositoryInfo(repo)
      .then((res) => {
        dispatch({type: 'FETCH_REPO_INFO_FULLFILLED', payload: res})
      })
      .catch((err) =>{
        dispatch({type: 'FETCH_REPO_INFO_ERROR', payload: err})
      })
  }
}

exports.resetRepoInfoState = () => {
  return({
    type: 'FETCH_REPO_INFO_STATE'
  })
}