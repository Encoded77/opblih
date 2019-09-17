'use strict'
const React = require('react')

//Components
const { Box } = require('ink')
const Gradient = require('ink-gradient')
const figures = require('figures')

// Overwrite Selectmenu indicator components
const ItemIndicator = ({
  isSelected,
  label
}) => {

  if(isSelected){
    return(<Gradient name='morning'>{figures.arrowRight}{' '}</Gradient>)
  } else {
    return(<Box>{'  '}</Box>)
  }
}

module.exports = ItemIndicator