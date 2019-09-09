'use strict'

const React = require('react')
const PropTypes = require('prop-types')

//Components
const { Box, Text, Color } = require('ink')
const { To } = require('ink-step')
const TextInput = require('ink-text-input').default

class CredentialForm extends React.Component {
  constructor(...args){
    super(...args)

    this.state = {
      nextStep: false,
      input: 'mail',
      mail: '',
      password: ''
    }

    this.onMailChange = this.onMailChange.bind(this)
    this.onMailSubmit = this.onMailSubmit.bind(this)
    this.onPasswordChange = this.onPasswordChange.bind(this)
    this.onPasswordSubmit = this.onPasswordSubmit.bind(this)
  }

  onMailChange(mail){
    this.setState({ mail })
  }

  onMailSubmit(){
    this.setState({
      input: 'password'
    })
  }

  onPasswordChange(password){
    this.setState({ password })
  }

  onPasswordSubmit(){
    const { store } = this.props
    store.set('mail', this.state.mail)
    store.set('password', this.state.password)
    this.setState({
      nextStep: true
    })
  }

  render(){
    if (this.state.nextStep){
      return(<To task='init' />)
    }

    if (this.state.input === 'mail'){
      return(
        <Box flexDirection='column'>
          <Text>Enter your <Color hex='#fcca72'>epitech</Color> email:</Text>
          <TextInput 
            value={this.state.mail}
            onChange={this.onMailChange}
            onSubmit={this.onMailSubmit}
          />
        </Box>
      )
    } else if (this.state.input === 'password') {
      return(
        <Box flexDirection='column'>
          <Text>Enter your <Color hex='#fcca72'>password</Color>:</Text>
          <TextInput 
            value={this.state.password}
            onChange={this.onPasswordChange}
            onSubmit={this.onPasswordSubmit}
            mask='*'
          />
        </Box>
      )
    }
  }
}

module.exports = CredentialForm