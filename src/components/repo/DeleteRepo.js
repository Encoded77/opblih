'use strict'
const React = require('react')
const { connect } = require('react-redux')
const importJsx = require('import-jsx')

//Actions
const { changeRoute } = require('../../actions/routeActions')
const { deleteRepo, fetchRepos, resetListReposState, resetDeleteRepoState } = require('../../actions/repoActions')

//Components
const { Box, Text, Color } = require('ink')
const TextInput = require('ink-text-input').default

const SelectInput = require('ink-select-input').default
const Item = importJsx('../Item')
const ItemIndicator = importJsx('../ItemIndicator')

const Spinner = require('ink-spinner').default
const Gradient = require('ink-gradient')
const GoBack = importJsx('../GoBack')

class DeleteRepo extends React.Component {
  constructor(...args){
    super(...args)

    this.props.resetListReposState()
    this.props.resetDeleteRepoState()
    this.props.fetchRepos()
    this.handleSelect = this.handleSelect.bind(this)
  }

  handleSelect(option){
    if (option.value.action === 'deleteRepo') {
      this.props.resetListReposState()
      this.props.deleteRepo(option.value.name)
    } else if (option.value.action !== ''){
      this.props[option.value.action]()
    }
    if (option.value.route === 'repoMenu') this.props.changeRoute(option.value.route)
  }

  render(){
    if (this.props.deleteError){
      return(
        <Box flexDirection='column'>
          <Text>{this.props.deleteError}</Text>
          <GoBack 
            label='Go back'
            route='repoMenu'
            action='resetDeleteRepoState'
          />
        </Box>
      )
    }

    if (this.props.deleteResponse){
      return(
        <Box flexDirection='column'>
          <Text>{this.props.deleteResponse}</Text>
          <GoBack 
            label='Go back'
            route='repoMenu'
            action='resetDeleteRepoState'
          />
        </Box>
      )
    }

    if (this.props.listLoading){
      return (
        <Gradient name='morning'>
          {' Loading repos'} <Spinner type="dots"/>
        </Gradient>
      )
    }

    if (this.props.listError) {
      return (
        <Box flexDirection='column'>
          <Text>{this.props.listError}</Text>
          <GoBack 
            label='Go back'
            route='repoMenu'
            action='resetDeleteRepoState'
          />
        </Box>
      )
    }

    if (this.props.listRepos){
      // Format result
      const repos = this.props.listRepos
      let data = []
      let i = 0
        repos.forEach(el => {
          data.push({
            label:` ${el.name}`,
            value: {
              route: '',
              action: 'deleteRepo',
              name: `${el.name}`
            },
            key: i++
          })
        })
      data.push({
        label:` Go back`,
          value: {
            route: 'repoMenu',
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
  listLoading: state.repo.list.loading,
  listError: state.repo.list.error,
  listRepos: state.repo.list.repos,
  deleteLoading: state.repo.delete.loading,
  deleteError: state.repo.delete.error,
  deleteResponse: state.repo.delete.response
})

const mapDispatchToProps = {
  changeRoute,
  fetchRepos,
  deleteRepo,
  resetListReposState,
  resetDeleteRepoState
}

module.exports = connect(mapStateToProps, mapDispatchToProps)(DeleteRepo)
