import React from 'react'
import { hot } from 'react-hot-loader'
import styled from 'styled-components'

const Title = styled.h1`
	font-size: 1.5em;
	text-align: center;
	color: blue;
`
const SubTitle = styled.h3`
	font-size: 0.8em;
	text-align: center;
`

const App = () => {
	return (
		<div>
			<Title>This is styled Title!</Title>
			<SubTitle>Made with React</SubTitle>
		</div>
	)
}

export default hot(module)(App)
