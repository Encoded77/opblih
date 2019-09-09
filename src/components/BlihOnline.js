'use strict'
const React = require('react')
const Blih = require('blih')

//Components
const { Text, Color } = require('ink')

class BlihOnline extends React.Component {
  constructor(...args){
    super(...args)
    this.state = {
      status: undefined
    }
  }

  componentDidMount(){
    Blih.ping()
      // If server is accessible
      .then((ms) => {
        this.setState({
          status: 'online',
          ms: ms
        })
      })
      // If server is not accessible
      .catch((err) => {
        this.setState({
          status: 'offline'
        })
      })
  }

  render(){
    if (this.state.status === undefined) return null
    if (this.state.status === 'online'){
      return(
        <Text>
          blih server: <Color greenBright>{this.state.status}</Color> ({this.state.ms}ms)
        </Text>
      )
    }
    if (this.state.status === 'offline'){
      return(
        <Text>
          blih server: <Color red>{this.state.status}</Color>
        </Text>
      )
    }
    return null

  }
}

module.exports = BlihOnline