module.exports = function(state = {
  render: undefined
}, action){

  switch (action.type){
    case 'CHANGE_ROUTE': {
      return state = {...state, render: action.payload}
    }
  }

  return state
}