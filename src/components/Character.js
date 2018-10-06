import React from 'react'
import store from '../models'
import { observer } from 'mobx-react'
import { hot } from 'react-hot-loader'
import styled from 'styled-components'

import GuessGame from './GuessGame'

const Container = styled.div`
	display: flex;
	flex-direction: column;
	align-content: center;
	width: 50%;
`

const Character = () => {
	return store.list.current ? (
		<Container>
			{store.list.current.name}
			<button onClick={() => store.list.getRandomCharacter()}>Bring new one!</button>
			<GuessGame />
		</Container>
	) : null
}

export default hot(module)(observer(Character))
