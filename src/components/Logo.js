'use strict'
const React = require('react')

// Components
const Gradient = require('ink-gradient')
const BigText = require('ink-big-text')

const Logo = (props) => {
  return(
    <Gradient name='morning'>
      <BigText 
      text={props.text}
      font='chrome'
      space={false}
      />
    </Gradient>
  )
}

module.exports = Logo