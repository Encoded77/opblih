'use strict'
const React = require('react')
const importJsx = require('import-jsx')
const { connect } = require('react-redux')

//Actions
const { changeRoute } = require('../actions/routeActions')
const { fetchSshKeys, addSshKey, deleteSshKey } = require('../actions/sshActions')

// Components
const SelectInput = require('ink-select-input').default
const Item = importJsx('../components/Item')
const ItemIndicator = importJsx('../components/ItemIndicator')

class SshMenu extends React.Component {
  constructor(...args){
    super(...args)
    this.handleSelect = this.handleSelect.bind(this)
  }

  handleSelect(option){
    if (option.value.action !== '') this.props[option.value.action]()
    if (option.value.route !== '') this.props.changeRoute(option.value.route)
  }

  render(){
    return( // default case, render the select menu
      <SelectInput 
        items={selectItems} 
        onSelect={this.handleSelect}
        itemComponent={Item}
        indicatorComponent={ItemIndicator}
      />
    )
  }
}

const selectItems = [
  {
    label:' Add a key',
    value: {
      route: 'addSsh',
      action: ''
    },
    key: 0
  },
  {
    label:' Delete a key',
    value: {
      route: 'deleteSsh',
      action: ''
    },
    key: 1
  },
  {
    label:' List ssh keys',
    value: {
      route: 'sshList',
      action: 'fetchSshKeys'
    },
    key: 2
  },
  {
    label:' Go back',
    value: {
      route: 'mainMenu',
      action: ''
    },
    key: 3
  }
]

const mapStateToProps = state => ({

})

const mapDispatchToState = {
  changeRoute,
  fetchSshKeys,
  deleteSshKey,
  addSshKey
}

module.exports = connect(mapStateToProps, mapDispatchToState)(SshMenu)
