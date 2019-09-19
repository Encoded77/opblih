'use strict'
const React = require('react')
const importJsx = require('import-jsx')
const { connect } = require('react-redux')

//Actions
const { changeRoute } = require('../actions/routeActions')
const { fetchRepos } = require('../actions/repoActions')

// Components
const SelectInput = require('ink-select-input').default
const Item = importJsx('../components/Item')
const ItemIndicator = importJsx('../components/ItemIndicator')
const { Box, Color, Text } = require('ink')

class RepoMenu extends React.Component {
  constructor(...args){
    super(...args)
    this.handleSelect = this.handleSelect.bind(this)
  }

  handleSelect(option){
    if (option.value.action !== '') this.props[option.value.action]()
    if (option.value.route !== '') this.props.changeRoute(option.value.route)
  }

  render(){
    return( // default case, render the select menu<
      <Box flexDirection='column'>
        <Text bold><Color hex='#fcca72'>Repositories actions:</Color></Text>
        <SelectInput 
        items={selectItems} 
          onSelect={this.handleSelect}
          itemComponent={Item}
          indicatorComponent={ItemIndicator}
        />
      </Box>
    )
  }
}

const selectItems = [
  {
    label:' Add a repo',
    value: {
      route: 'addRepo',
      action: ''
    },
    key: 0
  },
  {
    label:' Delete a repo',
    value: {
      route: 'deleteRepo',
      action: ''
    },
    key: 1
  },
  {
    label:' List repos',
    value: {
      route: 'repoList',
      action: 'fetchRepos'
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
  fetchRepos
}

module.exports = connect(mapStateToProps, mapDispatchToState)(RepoMenu)
