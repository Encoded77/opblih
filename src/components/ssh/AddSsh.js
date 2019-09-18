'use strict'
const React = require('react')
const { connect } = require('react-redux')
const importJsx = require('import-jsx')

//Actions
const { changeRoute } = require('../../actions/routeActions')
const { addSshKey } = require('../../actions/sshActions')

//Components
const { Box, Text, Color } = require('ink')
const TextInput = require('ink-text-input').default
const Spinner = require('ink-spinner').default
const Gradient = require('ink-gradient')
const GoBack = importJsx('../GoBack')

class AddSsh extends React.Component {
  constructor(...args){
    super(...args)

    this.state = {
      input: ''
    }

    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  onChange(input){
    this.setState({input})
  }

  onSubmit(){
    this.props.addSshKey(this.state.input)
  }

  render(){
    if (this.props.loading){
      return (
        <Gradient name='morning'>
          {' Loading keys'} <Spinner type="dots"/>
        </Gradient>
      )
    }

    if (this.props.error) {
      return (
        <Box flexDirection='column'>
          <Text>{this.props.error}</Text>
          <GoBack 
            label='Go back'
            route='sshMenu'
            action='resetSshAddState'
          />
        </Box>
      )
    }

    if (this.props.response){
      return (
        <Box flexDirection='column'>
          <Text>{this.props.response}</Text>
          <GoBack 
            label='Go back'
            route='sshMenu'
            action='resetSshAddState'
          />
        </Box>
      )
    }

    return(
      <Box flexDirection='column'>
        <Text bold><Color hex='#fcca72'>Paste the content</Color> (ctrl + shift + v) <Color hex='#fcca72'>of your ssh key below</Color>:</Text>
        <Text>(Usually located in ~/.ssh/id_rsa.pub)</Text>
        <TextInput 
          value={this.state.input}
          onChange={this.onChange}
          onSubmit={this.onSubmit}
        />
      </Box>
    )
  }
}

const mapStateToProps = state => ({
  loading: state.ssh.add.loading,
  error: state.ssh.add.error,
  response: state.ssh.add.response
})

const mapDispatchToProps = {
  addSshKey
}

module.exports = connect(mapStateToProps, mapDispatchToProps)(AddSsh)
