'use strict'
// React imports
const React = require('react')
const importJsx = require('import-jsx')

//Steps
const Init = importJsx('./steps/Init')
const HomeMenu = importJsx('./steps/HomeMenu')
const CredentialForm = importJsx('./steps/CredentialForm')
const ActionDispatcher = importJsx('./steps/ActionDispatcher');

// Components
const { Step, To } = require('ink-step')
const { Box } = require('ink')
const Logo = importJsx('./components/Logo')
const ShowEmail = importJsx('./components/ShowEmail.js')
const BlihOnline = importJsx('./components/BlihOnline')

// Config store
const configstore = require('../config/config')
const config = configstore.getConfig()

// Blih
const Blih = require('blih')

class App extends React.Component {
  constructor(...args){
    super(...args)

    this.state = {
      credentials: {
        mail: undefined,
        password: undefined
      },
      data: {} // data object to pass along to actionDispatcher
    }

    this.initBlih = this.initBlih.bind(this)
    this.assignData = this.assignData.bind(this)
    this.resetCredentials = this.resetCredentials.bind(this)
  }

  /**
   * Set credentials to app state with an instance of blih
   * @param {string} mail 
   * @param {string} password 
   */
  initBlih(mail, password){
    this.setState({
      credentials: {
        mail: mail,
        password: password
      },
      blih: new Blih({
        email: mail,
        password: password
      })
    })
  }

  /**
   * Assign data to be passed to action dispatcher
   * @param  {...any} args properties to spread in app.state.data without triggering rerender of App
   */
  assignData(...args){
    this.state.data = args
  }

  /**
   * Reset credentials in app state
   */
  resetCredentials(){
    this.setState({
      credentials: {
        mail: undefined,
        password: undefined
      }
    })
  }

  render(){
    return(
      <Box justifyContent="center">
        <Box flexDirection='column' alignItems='center' width='60%'>
          <Box flexDirection='column' alignItems='center' marginBottom={1}>
            <Logo text='OP-Blih' />
            <ShowEmail 
            mail={this.state.credentials.mail}
            />
            <BlihOnline />
          </Box>
          <Box marginBottom={1} >
            <Step task='init'>
              {/* Initialization logic step */}
              <Init 
              credentials={this.state.credentials}
              setCredentials={this.initBlih}
              store={config}
              />
            </Step>

            {/* Side step:
            *** if credentials are undefined when loaded from config store
            *** Ask user to input them, then store them, then return to step init
            */}
            <Step task='credentialForm'>
              <CredentialForm 
              store={config}
              />
            </Step>

            <Step task='homeMenu'>
              <HomeMenu 
              assignData={this.assignData}
              />
            </Step>

            {/* Action dispatcher */}
            <Step task='actionDispatcher'>
              <ActionDispatcher 
              store={config}
              blih={this.state.blih}
              data={this.state.data}
              resetCredentials={this.resetCredentials}
            />
            </Step>
          </Box>
        </Box>
      </Box>
    )
  }
}

module.exports = App
