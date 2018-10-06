import React from 'react'
import { observer } from 'mobx-react'
import store from '../models'
import styled from 'styled-components'

const AnswerContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
`

const Input = styled.input`
	width: 200px;
`

const GuessGame = () => {
	const { game } = store
	return (
		<AnswerContainer>
			<h2>{`What height ${game.character.name} is?`}</h2>
			<Input
				type="number"
				disabled={game.showAnswer}
				value={game.guessed || ''}
				onChange={e => game.changeGuess(e.target.value)}
			/>
			<button onClick={() => game.checkGuess()}>Guess!</button>
			{game.showAnswer ? (
				<AnswerContainer>
					<p>{`You have mistaken by ${game.diff}`}</p>
					<p>{`Right answer is ${game.character.height}`}</p>
					<button onClick={() => game.reset()}>Again!</button>
				</AnswerContainer>
			) : null}
		</AnswerContainer>
	)
}

export default observer(GuessGame)
