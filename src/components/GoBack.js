'use strict'
const React = require('react')
const importJsx = require('import-jsx')
const { connect } = require('react-redux')

// Actions
const { changeRoute } = require('../actions/routeActions')
const { resetSshAddState, resetSshDeleteState } = require('../actions/sshActions')
const { resetAddRepoState, resetListReposState, resetDeleteRepoState, resetRepoInfoState } = require('../actions/repoActions')
const { resetAddAclState } = require('../actions/aclActions')

// Components
const SelectInput = require('ink-select-input').default
const Item = importJsx('../components/Item')
const ItemIndicator = importJsx('../components/ItemIndicator')

/**
 * 
 * @param {label, route, action} props 
 */
const GoBack = (props) => {
  const selectItems = [
    {
      label:` ${props.label}`,
      value: {
        route: props.route || '',
        action: props.action || ''
      },
      key: 0
    }
  ]

  this.handleSelect = (option) => {
    if (option.value.action !== '') props[option.value.action]()
    if (option.value.route !== '') props.changeRoute(option.value.route)
  }

  return(
    <SelectInput 
      items={selectItems} 
      onSelect={this.handleSelect}
      itemComponent={Item}
      indicatorComponent={ItemIndicator}
    />
  )
}

const mapStateToProps = state => ({

})

const mapDispatchToProps = {
  changeRoute,
  resetSshAddState,
  resetSshDeleteState,
  resetListReposState,
  resetAddRepoState,
  resetDeleteRepoState,
  resetRepoInfoState,
  resetAddAclState
}

module.exports = connect(mapStateToProps, mapDispatchToProps)(GoBack)
