'use strict'
const React = require('react')
const importJsx = require('import-jsx')
const { connect } = require('react-redux')

// Steps
const CredentialForm = importJsx('./CredentialForm')
const MainMenu = importJsx('./MainMenu')

const RouteManager = (props) => {
  // ALL STEPS
  switch (props.render) {
    case 'credentialForm': return(<CredentialForm />)
    case 'mainMenu': return(<MainMenu />)
    default: return null
  }

}

const mapStateToProps = state => ({
  render: state.route.render
})

module.exports = connect(mapStateToProps)(RouteManager)