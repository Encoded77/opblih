'use strict'

const React = require('react')
const { connect } = require('react-redux')

// Actions
const { changeRoute } = require('../actions/routeActions')
const { setUser } = require('../actions/userActions')

//Components
const { Box, Text, Color } = require('ink')
const TextInput = require('ink-text-input').default

class CredentialForm extends React.Component {
  constructor(...args){
    super(...args)

    this.state = {
      email: '',
      password: '',
      input: 'mail'
    }


    this.onMailChange = this.onMailChange.bind(this)
    this.onMailSubmit = this.onMailSubmit.bind(this)
    this.onPasswordChange = this.onPasswordChange.bind(this)
    this.onPasswordSubmit = this.onPasswordSubmit.bind(this)
  }

  onMailChange(email){
    this.setState({ email })
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
    this.props.setUser(this.state.email, this.state.password)
    this.props.changeRoute('mainMenu')
  }

  render(){
    if (this.state.input === 'mail'){
      return(
        <Box flexDirection='column'>
          <Text>Enter your <Color hex='#fcca72'>epitech</Color> email:</Text>
          <TextInput 
            value={this.state.email}
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

const mapStateToProps = state => ({
  email: state.user.email,
  password: state.user.password
})

const mapDispatchToProps = {
  changeRoute,
  setUser
}

module.exports = connect(mapStateToProps, mapDispatchToProps)(CredentialForm)