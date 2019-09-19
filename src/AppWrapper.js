'use strict'

const React = require('react')
const importJsx = require('import-jsx')

//Redux
const { Provider } = require('react-redux')
const store = require('./store')

const App = importJsx('./App')

// Wrap entire app in Ink-Redux provider
const AppWrapper = () => {
  return(
    <Provider store={store}>
      <App />
    </Provider>
  )
}

module.exports = AppWrapper