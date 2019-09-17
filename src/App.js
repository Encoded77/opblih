'use strict'
// React imports
const React = require('react')
const importJsx = require('import-jsx')
const { connect } = require('react-redux')

//actions
const { changeRoute } = require('./actions/routeActions')

// Components
const { Box } = require('ink')
const Logo = importJsx('./components/Logo')
const ShowEmail = importJsx('./components/ShowEmail.js')
const BlihOnline = importJsx('./components/BlihOnline')
const RouteManager = importJsx('./routes/RouteManager')

class App extends React.Component {
  constructor(...args){
    super(...args)
    if (this.props.email === undefined){
      this.props.changeRoute('credentialForm')
    } else {
      this.props.changeRoute('mainMenu')
    }
  }

  render(){
    return(
      <Box justifyContent="center">
        <Box flexDirection='column' alignItems='center' width='60%'>
          <Box flexDirection='column' alignItems='center' marginBottom={1}>

            <Logo text='OP-Blih' />
            <ShowEmail 
              email={this.props.email}
            />
            <BlihOnline />

          </Box>
          <Box marginBottom={1} >

            {/* Component managing pages rendering */}
            <RouteManager />

          </Box>
        </Box>
      </Box>
    )
  }
}

const mapStateToProps = state => ({
  email: state.user.email,
  password: state.user.password
})

const mapDispatchToProps = {
  changeRoute
}

module.exports = connect(mapStateToProps, mapDispatchToProps)(App)
