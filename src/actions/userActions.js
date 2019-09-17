exports.setUser = (email, password) => {
  return {
    type: 'SET_USER',
    payload: {
      email: email,
      password: password
    }
  }
}

exports.deleteUser = () => {
  return {
    type: 'DELETE_USER'
  }
}