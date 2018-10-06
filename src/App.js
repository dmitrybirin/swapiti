import React from 'react'
import { hot } from 'react-hot-loader'
import styled from 'styled-components'
import { observer } from 'mobx-react'

import { list } from './models/Character'
import Character from './components/Character'
import './App.css'

const Title = styled.h1`
	font-size: 1.5em;
	text-align: center;
	color: yellow;
`

const Container = styled.div`
	color: white;
`

class App extends React.Component {
	async componentDidMount() {
		await list.load()
		list.getRandomCharacter()
	}

	render() {
		return (
			<Container>
				<Title>
					Star Wars Api with MobX
					<strike>-Wing</strike>
				</Title>
				{list.loading ? 'Loading...' : <Character />}
			</Container>
		)
	}
}

export default hot(module)(observer(App))
