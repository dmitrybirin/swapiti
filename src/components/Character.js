import React from 'react'
import store from '../models'
import { observer } from 'mobx-react'
import { hot } from 'react-hot-loader'
import styled from 'styled-components'

import GuessGame from './GuessGame'
import Button from './SDK/Button'

const Container = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-items: center;
`

const Face = styled.div`
	width: 100vh;
	height: 300px;
	background-position: center;
	background-image: url(${props => props.src});
	background-repeat: no-repeat;
	background-clip: border-box;
`

const Name = styled.h1`
	font-weight: 700;
	text-align: center;
`

const Character = () =>
	store.list.current ? (
		<Container>
			<Face src={store.list.current.image}>
				<Name>{store.list.current.name}</Name>
			</Face>
			<Button onClick={() => store.list.getRandomCharacter()}>Bring new one!</Button>
			<GuessGame />
		</Container>
	) : null

export default hot(module)(observer(Character))
