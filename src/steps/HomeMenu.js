'use strict'
const React = require('react')
const importJsx = require('import-jsx')

// Components
const SelectInput = require('ink-select-input').default
const { To } = require('ink-step')
const Item = importJsx('../components/Item')
const ItemIndicator = importJsx('../components/ItemIndicator')

class HomeMenu extends React.Component {
  constructor(...args){
    super(...args)

    this.state = {
      action: undefined,
      to: undefined
    }
    this.handleSelect = this.handleSelect.bind(this)
  }

  handleSelect(option){
    this.setState({
      action: option.value,
      to: option.to
    })
  }

  render(){
    switch (this.state.action) {
      case undefined:
          return( // default case, render the select menu
            <SelectInput 
              items={selectItems} 
              onSelect={this.handleSelect}
              itemComponent={Item}
              indicatorComponent={ItemIndicator}
              />
          )
    
      default: // On default render go to Step action passing along props
        const { action, to } = this.state.action
        this.state.action = undefined
        this.state.to = undefined

        this.props.assignData({action, to})
        return(
          <To task='actionDispatcher' />
        )
        break
    }

  }
}

const selectItems = [
  {
    label:' Repositories',
    value: {
      action: 'showReposActions',
      to: 'reposMenu'
    },
    key: 0
  },
  {
    label:' ACLs',
    value: {
      action: 'showAclActions',
      to: 'aclMenu'
    },
    key: 1
  },
  {
    label: 'Forget current email & password',
    value: {
      action: 'forgetAction',
      to: 'init'
    },
    key: 2
  }
]

module.exports = HomeMenu
