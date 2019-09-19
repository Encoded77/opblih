'use strict'
const React = require('react')
const importJsx = require('import-jsx')
const { connect } = require('react-redux')

// Actions

// Components
const { Box, Text, Color } = require('ink')
const Spinner = require('ink-spinner').default
const Gradient = require('ink-gradient')
const Table = require('ink-table').default

const GoBack = importJsx('../GoBack')
const CustomHeader = ({children}) => <Gradient name='morning'>{children}</Gradient>

class RepoInfo extends React.Component {

  formatInfo(infos){
    let array
    return array = [infos]
  }

  render(){
    if (this.props.loading) {
      return (
        <Gradient name='morning'>
          {' Loading infos'} <Spinner type="dots"/>
        </Gradient>
      )
    }

    if (this.props.error){
      return(
        <Box flexDirection='column'>
          <Text>{this.props.error}</Text>
          <GoBack 
            label=' Go back'
            route='repoList'
            action='resetRepoInfoState'
          />
        </Box>
      )
    }

    if (this.props.info){
      const data = this.formatInfo(this.props.info)
      return(
        <Box flexDirection='column' alignItems='center'>
          <Table 
            data={data}
            header={CustomHeader}
          />
          <GoBack 
            label=' Go back'
            route='repoList'
            action='resetRepoInfoState'
          />
        </Box>
      )
    }
  }
}

const mapStateToProps = state => ({
  loading: state.repo.info.loading,
  info: state.repo.info.info,
  error: state.repo.info.error
})

module.exports = connect(mapStateToProps)(RepoInfo)