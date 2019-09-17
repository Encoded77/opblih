exports.changeRoute = (route) => {
  return({
    type: 'CHANGE_ROUTE',
    payload: route
  })
}