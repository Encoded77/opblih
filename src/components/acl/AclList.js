'use strict'
const React = require('react')
const importJsx = require('import-jsx')
const { connect } = require('react-redux')

// Actions
const { changeRoute } = require('../../actions/routeActions')
const { fetchAcl, resetFetchAclState } = require('../../actions/aclActions')

// Components
const Spinner = require('ink-spinner').default
const Gradient = require('ink-gradient')
const { Box, Color, Text } = require('ink')
const GoBack = importJsx('../GoBack')

const SelectInput = require('ink-select-input').default
const Item = importJsx('../Item')
const ItemIndicator = importJsx('../ItemIndicator')

class AclList extends React.Component {
  constructor(...args){
    super(...args)

    this.handleSelect = this.handleSelect.bind(this)
  }

  formatRepos(repos){
    let data = []
    let i = 0
    repos.forEach(el => {
      data.push({
        label:` ${el.name}`,
        value: {
          route: 'repoAclMenu',
          action: 'fetchAcl',
          name: `${el.name}`
        },
        key: i++
      })
    })
    data.push({
      label:` Go back`,
        value: {
          route: 'repoMenu',
          action: 'resetFetchAclState'
        },
        key: i++
    })

    return {
      data,
      index: i - 1
    }
  }

  handleSelect(option){
    if (option.value.action === 'fetchAcl') {
      this.props.resetFetchAclState()
      this.props.fetchAcl(option.value.name)
    } else if (option.value.action !== ''){
      this.props[option.value.action]()
    }
    if (option.value.route !== '') this.props.changeRoute(option.value.route)
  }

  render(){
    if (this.props.loading) {
      return (
        <Gradient name='morning'>
          {' Loading repos'} <Spinner type="dots"/>
        </Gradient>
      )
    }

    if (this.props.repos){

      const infos = this.formatRepos(this.props.repos)
      let i = 0
      return  (
        <Box flexDirection='column'>
          <SelectInput 
            items={infos.data} 
            onSelect={this.handleSelect}
            itemComponent={Item}
            indicatorComponent={ItemIndicator}
            initialIndex={infos.index}
          />
        </Box>
      )
    }

    if(this.props.error){
      return(
        <Box flexDirection='column'>
          <Text>{this.props.error}</Text>
          <GoBack 
          label=' Go back'
          route='mainMenu'
          action='resetFetchAclState'
          />
      </Box>
      )
    }

    return (<Box>AAAAAA</Box>)
  }
}

const mapStateToProps = state => {
  return {
    repos: state.repo.list.repos,
    error: state.repo.list.error,
    loading: state.repo.list.loading
  }
}

const mapDispatchToProps = {
  changeRoute,
  resetFetchAclState,
  fetchAcl
}

module.exports = connect(mapStateToProps, mapDispatchToProps)(AclList)
