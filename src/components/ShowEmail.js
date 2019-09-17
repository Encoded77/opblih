'use strict'
const React = require('react')

// Components
const { Box, Text, Color } = require('ink')

/**
 * Presentational component
 * @param {*} props text
 */
const ShowEmail = (props) => {
  //Check for mail presence
  if (props.email === undefined) return <Box></Box>

  return(
    <Text><Color hex='#fcca72'>Current email</Color>: {props.email}</Text>
  )
}

module.exports = ShowEmail
