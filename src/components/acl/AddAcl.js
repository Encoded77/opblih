'use strict'
const React = require('react')
const importJsx = require('import-jsx')
const { connect } = require('react-redux')

// Actions
const { changeRoute } = require('../../actions/routeActions')
const { setAcl, resetAddAclState } = require('../../actions/aclActions')

// Components
const { Box, Color, Text } = require('ink')
const Spinner = require('ink-spinner').default
const Gradient = require('ink-gradient')
const GoBack = importJsx('../GoBack')

const MultiSelect = require('ink-multi-select').default
const Item = importJsx('../Item')
const ItemIndicator = importJsx('../ItemIndicator')
const Checkbox = importJsx('../Checkbox')

const TextInput = require('ink-text-input').default


class AddAcl extends React.Component {
  constructor(...args){
    super(...args)

    this.state = {
      asking: 'name',
      name: '',
      acls: undefined
    }

    this.handleNameInput = this.handleNameInput.bind(this)
    this.handleNameSubmit = this.handleNameSubmit.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  handleNameInput(name){
    this.setState({ name })
  }

  handleNameSubmit(){
    this.setState({asking: 'acl'})
  }

  onSubmit(acl){
    let acls = ''
    acl.forEach(el => {
      acls += el.value
    })
    this.props.setAcl(this.props.repo, this.state.name, acls)
  }

  render(){
    if (this.props.loading){
      <Gradient name='morning'>
        {' Waiting confirmation'} <Spinner type="dots"/>
      </Gradient>
    }

    if (this.props.error){
      return (
        <Box flexDirection='column'>
          <Text>{this.props.error}</Text>
          <GoBack 
            label=' Go back'
            route='aclList'
            action='resetAddAclState'
          />
        </Box>
      )
    }

    if (this.props.res){
      return (
        <Box flexDirection='column'>
          <Text>{this.props.res}</Text>
          <GoBack 
            label=' Go back'
            route='aclList'
            action='resetAddAclState'
          />
        </Box>
      )
    }

    if (this.state.asking === 'name'){
      return(
        <Box flexDirection='column'>
          <Text bold><Color hex='#fcca72'>Who do you want to add ?</Color></Text>
          <TextInput 
            value={this.state.name}
            onChange={this.handleNameInput}
            onSubmit={this.handleNameSubmit}
          />
        </Box>
      )
    }

    if (this.state.asking === 'acl'){
      return(
        <Box flexDirection='column' >
          <Text>Which rights do you want to give ? (Space to select, Enter to accept)</Text>
          <MultiSelect 
            items={items}
            indicatorComponent={ItemIndicator}
            itemComponent={Item}
            checkboxComponent={Checkbox}
            onSubmit={this.onSubmit}
            initialIndex={0}
          />
        </Box>
      )
    }

    return(
      <Box>bbbbbcc</Box>
    )
  }
}

const items = [
  {
    label: ' Read',
    value: 'r',
    key: 0
  }, 
  {
    label: ' Write',
    value: 'w',
    key: 1
  },
  {
    label: ' Admin',
    value: 'a',
    key: 2
  }
]

const mapStateToProps = state => ({
  repo: state.acl.acl.repo,
  loading: state.acl.add.loading,
  error: state.acl.add.error,
  res: state.acl.add.res
})

const mapDispatchToProps = {
  changeRoute, 
  setAcl,
  resetAddAclState
}

module.exports = connect(mapStateToProps, mapDispatchToProps)(AddAcl)
