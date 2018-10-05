import React from 'react'
import { hot } from 'react-hot-loader'
import styled from 'styled-components'

// import { characterList } from './models/Character'
import './App.css'

const Title = styled.h1`
	font-size: 1.5em;
	text-align: center;
	color: yellow;
`

const App = () => {
	return (
		<div>
			<Title>
				Star Wars Api with MobX
				<strike>-Wing</strike>
			</Title>
		</div>
	)
}

export default hot(module)(App)
