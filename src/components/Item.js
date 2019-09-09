'use strict'
const React = require('react')

//Components
const {Text, Color} = require('ink')

// Overwrite Selectmenu item components
const Item = ({
  isSelected,
  label
}) => {

  if(isSelected){
    return(<Text bold><Color hex='#fcca72'>{label}</Color></Text>)
  } else {
    return(<Text>{label}</Text>)
  }
}

module.exports = Item