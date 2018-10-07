import React from 'react'
import { observer } from 'mobx-react'
import store from '../models'
import styled from 'styled-components'

import Button from './SDK/Button'

const AnswerContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
`

const Input = styled.input`
	width: 200px;
	height: 30px;
	margin: 10px;
	background-color: black;
	color: yellow;
	border-color: yellow;
	border-style: groove;
	font-weight: 700;
	font-size: 28px;

	&::placeholder {
		color: yellow;
		font-weight: 700;
	}

	&::-webkit-inner-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}
`

const QuestionContainer = styled.div`
	display: flex;
	flex-direction: row;
`

const GuessGame = () => {
	const { game } = store
	return (
		<AnswerContainer>
			<h2>{`What height ${game.character.name} is?`}</h2>
			<QuestionContainer>
				<Input
					type="number"
					disabled={game.showAnswer}
					value={game.guessed || ''}
					placeholder={'cm'}
					onChange={e => game.changeGuess(e.target.value)}
				/>
				<Button onClick={() => game.checkGuess()}>Guess!</Button>
			</QuestionContainer>
			{game.showAnswer ? (
				<AnswerContainer>
					<p>{`You have mistaken by ${game.diff}`}</p>
					<p>{`Right answer is ${game.character.height}`}</p>
					<Button onClick={() => game.reset()}>Again!</Button>
				</AnswerContainer>
			) : null}
		</AnswerContainer>
	)
}

export default observer(GuessGame)
