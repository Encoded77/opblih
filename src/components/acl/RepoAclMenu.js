'use strict'
const React = require('react')
const importJsx = require('import-jsx')
const { connect } = require('react-redux')

// Actions
const { changeRoute } = require('../../actions/routeActions')
const { resetFetchAclState } = require('../../actions/aclActions')

// Components
const Spinner = require('ink-spinner').default
const Gradient = require('ink-gradient')
const { Box, Color, Text } = require('ink')
const GoBack = importJsx('../GoBack')

const SelectInput = require('ink-select-input').default
const Item = importJsx('../Item')
const ItemIndicator = importJsx('../ItemIndicator')

const Table = require('ink-table').default

const CustomHeader = ({children}) => <Gradient name='morning'>{children}</Gradient>

class RepoAclMenu extends React.Component {
  constructor(...args){
    super(...args)
    this.handleSelect = this.handleSelect.bind(this)
  }

  handleSelect(option){
      
    if (option.value.action !== ''){
      this.props[option.value.action]()
    }
    if (option.value.route !== '') this.props.changeRoute(option.value.route)
  }

  render(){
    if (this.props.loading) {
      return (
        <Gradient name='morning'>
          {' Loading keys'} <Spinner type="dots"/>
        </Gradient>
      )
    }

    if (this.props.error) {
      return(
        <Box flexDirection='column'>
          <Text>{this.props.error}</Text>
          <GoBack 
          label=' Go back'
          route='repoMenu'
          action='resetFetchAclState'
          />
        </Box>
      )
    }

    if (this.props.acl){
      return(
        <Box flexDirection='column'>
        <Table 
          data={this.props.acl}
          header={CustomHeader}
        />
        <SelectInput 
          items={selectItems} 
          onSelect={this.handleSelect}
          itemComponent={Item}
          indicatorComponent={ItemIndicator}
        />
      </Box>
      )
    }
    return(<Box>bbbbbbbbbb</Box>)
  }
}

const selectItems = [
  {
    label:' Add ACL',
    value: {
      route: 'addAcl',
      action: ''
    },
    key: 0
  },
  {
    label:' Remove ACL',
    value: {
      route: '',
      action: ''
    },
    key: 1
  },
  {
    label:' Go back',
    value: {
      route: 'aclList',
      action: ''
    },
    key: 2
  }
]

const mapStateToProps = state => {
  return {
    acl: state.acl.acl.acl,
    error: state.acl.acl.error,
    loading: state.acl.acl.loading
  }
}

const mapDispatchToProps = {
  changeRoute
}

module.exports = connect(mapStateToProps, mapDispatchToProps)(RepoAclMenu)
