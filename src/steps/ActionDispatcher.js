'use strict'

const React = require('react')
const PropTypes = require('prop-types')

//Components
const { To } = require('ink-step')

class ActionDispatcher extends React.Component {
  constructor(...args){
    super(...args)

    const obj = this.props.data.reduce((prev, cur, i ) => {
      prev[i] = cur
      return prev
    }, {})

    this.state = {
      data: obj[0]
    }

    switch (this.state.data.action) {
      // Delete credentials from config store & app state
      case 'forgetAction':
        const { store } = this.props
        store.delete('mail')
        store.delete('password')
        this.props.resetCredentials()
        break;

      case 'showSshActions':
        break

      case 'showReposActions':
          break
    
      default:
        throw 'Wrong action in ActionDispatcher'
        break
    }
  }

  render(){
    return(<To task={this.state.data.to} />)
  }
}

ActionDispatcher.propTypes = {
  action: PropTypes.string,
  to: PropTypes.string
}

module.exports = ActionDispatcher