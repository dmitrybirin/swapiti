import React from 'react'
import store from '../models'
import { observer } from 'mobx-react'
import { hot } from 'react-hot-loader'
import styled from 'styled-components'

import GuessGame from './GuessGame'

const Container = styled.div`
	display: flex;
	flex-direction: column;
	justify-items: center;
`

const Face = styled.div`
	height: 70vh;
	background-size: 500px;
	background-position: center;
	background-image: url(${props => props.src});
	background-repeat: no-repeat;
	background-clip: content-box;
`

const Name = styled.h1`
	font-weight: 700;
`

const Character = () =>
	store.list.current ? (
		<Container>
			<Face src={store.list.current.image}>
				<Name>{store.list.current.name}</Name>
			</Face>
			<button onClick={() => store.list.getRandomCharacter()}>Bring new one!</button>
			<GuessGame />
		</Container>
	) : null

export default hot(module)(observer(Character))
