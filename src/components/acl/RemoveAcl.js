'use strict'
const React = require('react')
const importJsx = require('import-jsx')
const { connect } = require('react-redux')

// Actions
const { changeRoute } = require('../../actions/routeActions')
const { setAcl, resetAddAclState, resetFetchAclState } = require('../../actions/aclActions')

// Components
const { Box, Color, Text } = require('ink')
const Spinner = require('ink-spinner').default
const Gradient = require('ink-gradient')
const GoBack = importJsx('../GoBack')

const SelectInput = require('ink-select-input').default
const Item = importJsx('../Item')
const ItemIndicator = importJsx('../ItemIndicator')


class RemoveAcl extends React.Component {
  constructor(...args){
    super(...args)

    this.handleSelect = this.handleSelect.bind(this)
  }


  handleSelect(option){
    if (option.value.action === 'deleteAcl') {
      this.props.setAcl(this.props.repo, option.value.name, '')
      this.props.resetAddAclState()
      this.props.resetFetchAclState()
    } else if (option.value.action !== ''){
      this.props[option.value.action]()
    }
    if (option.value.route === 'sshMenu') this.props.changeRoute(option.value.route)
  }

  formatAcl(acl){
    let data = []
    let i = 0
    acl.forEach(el => {
      data.push({
        label:` ${el.name}`,
        value: {
          route: '',
          action: 'deleteAcl',
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

    return data
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

    if (this.props.acl){
      const infos = this.formatAcl(this.props.acl)

      return (
        <Box flexDirection='column'>
          <SelectInput 
            items={infos} 
            onSelect={this.handleSelect}
            itemComponent={Item}
            indicatorComponent={ItemIndicator}
          />
        </Box>
      )
    }

    return(
      <Box>Default render</Box>
    )
  }
}

const mapStateToProps = state => ({
  acl: state.acl.acl.acl,
  repo: state.acl.acl.repo,
  loading: state.acl.add.loading,
  error: state.acl.add.error,
  res: state.acl.add.res
})


const mapDispatchToProps = {
  setAcl,
  resetAddAclState,
  resetFetchAclState
}

module.exports = connect(mapStateToProps, mapDispatchToProps)(RemoveAcl)
