'use strict'
//App Initialisation logic
const React = require('react')
const PropTypes = require('prop-types')

//Components
const { To } = require('ink-step')

class Init extends React.Component {
  constructor(...args){
    super(...args)

    this.state = {
      nextStep: false
    }

    // Get credentials from store
    const {store, SetCredentials} = args[0]
    const user = {
      mail: store.get('mail'),
      password: store.get('password')
    }

    // If credentials were loaded from config, skip this step and init blih in app
    if (user.mail !== undefined && user.password !== undefined) {
      this.state.nextStep = true
      this.props.setCredentials(user.mail, user.password)
    }
  }

  render(){
    if (!this.state.nextStep){
      return <To task='credentialForm' />
    } else {
      return(<To task='homeMenu' />)
    }
  }
}

module.exports = Init