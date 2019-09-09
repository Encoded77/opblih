'use strict'

const React = require('react')
const importJsx = require('import-jsx')

// Components
const { TaskProvider, createStepHistory } = require('ink-step')
const App = importJsx('./App')


const history = createStepHistory('init')

const AppWrapper = () => {
  return(
    <TaskProvider history={history} >
      <App />
    </TaskProvider>
  )
}

module.exports = AppWrapper