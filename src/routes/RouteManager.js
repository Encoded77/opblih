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
// Repo Routes
const RepoMenu = importJsx('./RepoMenu')
const RepoList = importJsx('../components/repo/RepoList')
const AddRepo = importJsx('../components/repo/AddRepo')
const DeleteRepo = importJsx('../components/repo/DeleteRepo')
const RepoInfo = importJsx('../components/repo/RepoInfo')
// Acl routes
const AclList = importJsx('../components/acl/AclList')
const RepoAclMenu = importJsx('../components/acl/RepoAclMenu')
const AddAcl = importJsx('../components/acl/AddAcl')
const RemoveAcl = importJsx('../components/acl/RemoveAcl')

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
    /* REPO actions / menus */
    case 'repoMenu': return(<RepoMenu />)
    case 'repoList': return(<RepoList />)
    case 'addRepo': return(<AddRepo />)
    case 'deleteRepo': return(<DeleteRepo />)
    case 'repoInfo': return(<RepoInfo />)
    /* ACLs actions / menus */
    case 'aclList': return(<AclList />)
    case 'repoAclMenu': return(<RepoAclMenu />)
    case 'addAcl': return(<AddAcl />)
    case 'removeAcl': return(<RemoveAcl />)

    default: return null
  }

}

const mapStateToProps = state => ({
  render: state.route.render
})

module.exports = connect(mapStateToProps)(RouteManager)