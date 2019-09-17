'use strict'
const React = require('react')
const importJsx = require('import-jsx')
const { connect } = require('react-redux')

//Actions
const { deleteUser } = require('../actions/userActions')
const { changeRoute } = require('../actions/routeActions')

// Components
const SelectInput = require('ink-select-input').default
const Item = importJsx('../components/Item')
const ItemIndicator = importJsx('../components/ItemIndicator')

class MainMenu extends React.Component {
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
    label:' Repositories Actions',
    value: {
      route: 'repositoryMenu',
      action: ''
    },
    key: 0
  },
  {
    label:' ACL Actions',
    value: {
      route: 'AclMenu',
      action: ''
    },
    key: 1
  },
  {
    label:' SSH Actions',
    value: {
      route: 'SshMenu',
      action: ''
    },
    key: 2
  },
  {
    label:' Forget current email & password',
    value: {
      route: 'credentialForm',
      action: 'deleteUser'
    },
    key: 3
  }
]

const mapStateToProps = state => ({

})

const mapDispatchToState = {
  deleteUser,
  changeRoute
}

module.exports = connect(mapStateToProps, mapDispatchToState)(MainMenu)
