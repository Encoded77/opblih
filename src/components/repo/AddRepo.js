'use strict'
const React = require('react')
const { connect } = require('react-redux')
const importJsx = require('import-jsx')

//Actions
const { changeRoute } = require('../../actions/routeActions')
const { createRepo, resetAddRepoState } = require('../../actions/repoActions')

//Components
const { Box, Text, Color } = require('ink')
const TextInput = require('ink-text-input').default
const Spinner = require('ink-spinner').default
const Gradient = require('ink-gradient')
const GoBack = importJsx('../GoBack')

class AddRepo extends React.Component {
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
    this.props.createRepo(this.state.input)
  }

  render(){
    if (this.props.loading){
      return (
        <Gradient name='morning'>
          {' Waiting confirmation'} <Spinner type="dots"/>
        </Gradient>
      )
    }

    if (this.props.error) {
      return (
        <Box flexDirection='column'>
          <Text>{this.props.error}</Text>
          <GoBack 
            label='Go back'
            route='repoMenu'
            action='resetAddRepoState'
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
            route='repoMenu'
            action='resetAddRepoState'
          />
        </Box>
      )
    }

    return(
      <Box flexDirection='column'>
        <Text bold><Color hex='#fcca72'>What's the name of the repo ?</Color></Text>
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
  loading: state.repo.add.loading,
  error: state.repo.add.error,
  response: state.repo.add.response
})

const mapDispatchToProps = {
  createRepo
}

module.exports = connect(mapStateToProps, mapDispatchToProps)(AddRepo)
