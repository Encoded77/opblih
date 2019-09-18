'use strict'
const React = require('react')
const importJsx = require('import-jsx')
const { connect } = require('react-redux')

// Routes
const CredentialForm = importJsx('./CredentialForm')
const MainMenu = importJsx('./MainMenu')
// Ssh Routes
const SshMenu = importJsx('./SshMenu')
const AddSsh = importJsx('../components/ssh/AddSsh')
const SshList = importJsx('../components/ssh/SshList')
const DeleteSsh = importJsx('../components/ssh/DeleteSsh')

const RouteManager = (props) => {
  // ALL STEPS
  switch (props.render) {
    case 'credentialForm': return(<CredentialForm />)
    case 'mainMenu': return(<MainMenu />)
    /* SSH actions / menus */
    case 'sshMenu': return(<SshMenu />)
    case 'addSsh': return(<AddSsh />)
    case 'deleteSsh': return(<DeleteSsh />)
    case 'sshList': return (<SshList />)
    default: return null
  }

}

const mapStateToProps = state => ({
  render: state.route.render
})

module.exports = connect(mapStateToProps)(RouteManager)