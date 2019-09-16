'use strict'
const React = require('react')

//Components
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
    return(<div>{'  '}</div>)
  }
}

module.exports = ItemIndicator