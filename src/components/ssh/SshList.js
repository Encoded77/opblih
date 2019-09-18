'use strict'
const React = require('react')
const importJsx = require('import-jsx')
const { connect } = require('react-redux')

// Components
const Table = require('ink-table').default
const Spinner = require('ink-spinner').default
const Gradient = require('ink-gradient')
const { Box, Color, Text } = require('ink')
const GoBack = importJsx('../GoBack')

const CustomHeader = ({children}) => <Gradient name='morning'>{children}</Gradient>

class SshList extends React.Component {
  render(){
    if (this.props.loading) {
      return (
        <Gradient name='morning'>
          {' Loading keys'} <Spinner type="dots"/>
        </Gradient>
      )
    }
    if (this.props.keys){
      let data = []
      this.props.keys.forEach(el => {
        data.push({Keys: el.name})
      })
      
      return  (
        <Box flexDirection='column'>
          <Table 
          data={data}
          header={CustomHeader}
          />
          <GoBack 
          label='Go back'
          route='sshMenu'
          />
        </Box>
      )
    }
    if(this.props.error){
      return(
        <Box flexDirection='column'>
        <Text>{this.props.error}</Text>
        <GoBack 
        label='Go back'
        route='sshMenu'
        />
      </Box>
      )
    }
  }
}

const mapStateToProps = state => {
  return {
    keys: state.ssh.list.keys,
    error: state.ssh.list.error,
    loading: state.ssh.list.loading
  }
}

module.exports = connect(mapStateToProps)(SshList)
