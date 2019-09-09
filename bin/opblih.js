#!/usr/bin/env node
'use strict'
const React = require('react')
const {render} = require('ink')
const importJsx = require('import-jsx')

// Require react app
const AppWrapper = importJsx('../src/AppWrapper.js')

// Render react app
render(React.createElement(AppWrapper))