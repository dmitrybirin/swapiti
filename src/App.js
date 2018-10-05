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

const List = styled.ul`
	list-style: none;
	color: white;
`

class App extends React.Component {
	constructor() {
		super()
		this.state = {
			list: CharacterList.create(),
		}
	}

	async componentDidMount() {
		await this.state.list.load()
	}

	render() {
		return (
			<div>
				<Title>
					Star Wars Api with MobX
					<strike>-Wing</strike>
				</Title>
				<div>
					<List>
						{this.state.list.items.map(c => (
							<li key={c.name}>{`${c.name}:${c.height}`}</li>
						))}
					</List>
				</div>
			</div>
		)
	}
}

export default hot(module)(observer(App))
