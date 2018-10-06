import React from 'react'
import { observer } from 'mobx-react'
import store from '../models'

const GuessGame = () => {
	const { game } = store
	return (
		<div>
			<input
				type="number"
				disabled={game.showAnswer}
				value={game.guessed || ''}
				onChange={e => game.changeGuess(e.target.value)}
			/>
			<button onClick={() => game.checkGuess()}>Guess!</button>
			{game.showAnswer ? (
				<div>
					<p>{`You have mistaken by ${game.diff}`}</p>
					<p>{`Right answer is ${game.character.height}`}</p>
					<button onClick={() => game.reset()}>Again!</button>
				</div>
			) : null}
		</div>
	)
}

export default observer(GuessGame)
