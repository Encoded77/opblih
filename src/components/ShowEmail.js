'use strict'

const React = require('react')

// Components
const { Box, Text, Color } = require('ink')

function ShowEmail(props){
  //Check for mail presence
  if (props.mail === undefined) return null

  return(
    <Text><Color hex='#fcca72'>Current email</Color>: {props.mail}</Text>
  )
}

ShowEmail.defaultProp = {
  mail: undefined
}
module.exports = ShowEmail