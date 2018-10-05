import React from 'react'
import { hot } from 'react-hot-loader'
import styled from 'styled-components'
import { observer } from 'mobx-react'

import { CharacterList } from './models/Character'
import './App.css'

const Title = styled.h1`
	font-size: 1.5em;
	text-align: center;
	color: yellow;
`

const Container = styled.div`
	color: white;
`

const List = styled.ul`
	list-style: none;
	color: white;
`

class App extends React.Component {
	constructor() {
		super()
		this.state = {
			list: CharacterList.create({ items: [], loading: false }),
		}
	}

	async componentDidMount() {
		await this.state.list.load()
	}

	render() {
		return (
			<Container>
				<Title>
					Star Wars Api with MobX
					<strike>-Wing</strike>
				</Title>
				{this.state.list.loading ? (
					'Loading...'
				) : (
					<List>
						{this.state.list.items.map(c => (
							<li key={c.name}>{`${c.name}:${c.height}`}</li>
						))}
					</List>
				)}
			</Container>
		)
	}
}

export default hot(module)(observer(App))
