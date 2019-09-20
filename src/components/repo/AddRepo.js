'use strict'
const React = require('react')
const { connect } = require('react-redux')
const importJsx = require('import-jsx')

//Actions
const { changeRoute } = require('../../actions/routeActions')
const { createRepo, resetAddRepoState } = require('../../actions/repoActions')
const { setAcl, resetAddAclState } = require('../../actions/aclActions')

//Components
const { Box, Text, Color } = require('ink')
const TextInput = require('ink-text-input').default
const Spinner = require('ink-spinner').default
const Gradient = require('ink-gradient')
const GoBack = importJsx('../GoBack')

const SelectInput = require('ink-select-input').default
const Item = importJsx('../Item')
const ItemIndicator = importJsx('../ItemIndicator')

// Git clone
const shell = require('shelljs')

const gitClone = (mail, repo) => {
  shell.exec(`git clone git@git.epitech.eu:/${mail}/${repo} ${process.cwd()}/${repo}`, { 'silent': true })
}

class AddRepo extends React.Component {
  constructor(...args){
    super(...args)

    this.state = {
      input: ''
    }

    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.handleSelect = this.handleSelect.bind(this)
  }

  onChange(input){
    this.setState({input})
  }

  onSubmit(){
    this.props.createRepo(this.state.input)
  }

  handleSelect(option){
    if (option.value.action === 'clone') {
      gitClone(this.props.email, this.state.input)
    } else if (option.value.action !== ''){
      this.props[option.value.action]()
    }
    if (option.value.route !== '') this.props.changeRoute(option.value.route)
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
            label=' Go back'
            route='repoMenu'
            action='resetAddRepoState'
          />
        </Box>
      )
    }

    if (this.props.response){
      this.props.setAcl(this.state.input, 'ramassage-tek', 'r')
      this.props.resetAddAclState()
      return (
        <Box flexDirection='column'>
          <Text>{this.props.response}</Text>
          <SelectInput 
            items={selectItems} 
            onSelect={this.handleSelect}
            itemComponent={Item}
            indicatorComponent={ItemIndicator}
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

const selectItems = [
  {
    label:' Clone into current directory',
    value: {
      route: 'repoMenu',
      action: 'clone'
    },
    key: 0
  },
  {
    label:' Go back',
    value: {
      route: 'repoMenu',
      action: ''
    },
    key: 2
  }
]
const mapStateToProps = state => ({
  loading: state.repo.add.loading,
  error: state.repo.add.error,
  response: state.repo.add.response,
  email: state.user.email
})

const mapDispatchToProps = {
  changeRoute,
  createRepo,
  setAcl,
  resetAddAclState
}

module.exports = connect(mapStateToProps, mapDispatchToProps)(AddRepo)
