const React = require('react')
const {Box, Color} = require('ink')
const figures = require('figures')
const Gradient = require('ink-gradient')

const Checkbox = ({isSelected}) => (
	<Box marginRight={1}>
		<Gradient name='morning'>{isSelected ? figures.circleFilled : figures.circle}</Gradient>
	</Box>
)

module.exports = Checkbox