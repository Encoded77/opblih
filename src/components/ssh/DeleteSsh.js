'use strict'
const React = require('react')
const { connect } = require('react-redux')
const importJsx = require('import-jsx')

//Actions
const { changeRoute } = require('../../actions/routeActions')
const { deleteSshKey, fetchSshKeys, resetSshListState, resetSshDeleteState } = require('../../actions/sshActions')

//Components
const { Box, Text, Color } = require('ink')
const TextInput = require('ink-text-input').default

const SelectInput = require('ink-select-input').default
const Item = importJsx('../Item')
const ItemIndicator = importJsx('../ItemIndicator')

const Spinner = require('ink-spinner').default
const Gradient = require('ink-gradient')
const GoBack = importJsx('../GoBack')

class DeleteSsh extends React.Component {
  constructor(...args){
    super(...args)

    this.props.resetSshListState()
    this.props.resetSshDeleteState()
    this.props.fetchSshKeys()
    this.handleSelect = this.handleSelect.bind(this)
  }

  handleSelect(option){
    if (option.value.action === 'deleteSshKey') {
      this.props.resetSshListState()
      this.props.deleteSshKey(option.value.name)
    } else if (option.value.action !== ''){
      this.props[option.value.action]()
    }
    if (option.value.route === 'sshMenu') this.props.changeRoute(option.value.route)
  }

  render(){
    if (this.props.deleteError){
      return(
        <Box flexDirection='column'>
          <Text>{this.props.deleteError}</Text>
          <GoBack 
            label=' Go back'
            route='sshMenu'
            action='resetSshDeleteState'
          />
        </Box>
      )
    }

    if (this.props.deleteResponse){
      return(
        <Box flexDirection='column'>
          <Text>{this.props.deleteResponse}</Text>
          <GoBack 
            label=' Go back'
            route='sshMenu'
            action='resetSshDeleteState'
          />
        </Box>
      )
    }

    if (this.props.listLoading){
      return (
        <Gradient name='morning'>
          {' Loading keys'} <Spinner type="dots"/>
        </Gradient>
      )
    }

    if (this.props.listError) {
      return (
        <Box flexDirection='column'>
          <Text>{this.props.listError}</Text>
          <GoBack 
            label=' Go back'
            route='sshMenu'
            action='resetSshDeleteState'
          />
        </Box>
      )
    }

    if (this.props.listKeys){
      // Format result
      const keys = this.props.listKeys
      let data = []
      let i = 0
        keys.forEach(el => {
          data.push({
            label:` ${el.name}`,
            value: {
              route: '',
              action: 'deleteSshKey',
              name: `${el.name}`
            },
            key: i++
          })
        })
      data.push({
        label:` Go back`,
          value: {
            route: 'sshMenu',
            action: ''
          },
          key: i++
      })

      return (
        <Box flexDirection='column'>
          <SelectInput 
            items={data} 
            onSelect={this.handleSelect}
            itemComponent={Item}
            indicatorComponent={ItemIndicator}
          />
        </Box>
      )
    }

    if (this.props.deleteLoading){
      return (
        <Gradient name='morning'>
          {' Waiting confirmation'} <Spinner type="dots"/>
        </Gradient>
      )
    }

    return(
      <Box>aaaa</Box>
    )
  }
}

const mapStateToProps = state => ({
  listLoading: state.ssh.list.loading,
  listError: state.ssh.list.error,
  listKeys: state.ssh.list.keys,
  deleteLoading: state.ssh.delete.loading,
  deleteError: state.ssh.delete.error,
  deleteResponse: state.ssh.delete.response
})

const mapDispatchToProps = {
  changeRoute,
  fetchSshKeys,
  deleteSshKey,
  resetSshListState,
  resetSshDeleteState
}

module.exports = connect(mapStateToProps, mapDispatchToProps)(DeleteSsh)
