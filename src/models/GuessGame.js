import { types, getParent } from 'mobx-state-tree'

const GuessGame = types
	.model('GuessGame', {
		input: types.string,
		showAnswer: types.boolean,
	})
	.actions(self => ({
		checkGuess() {
			self.showAnswer = true
		},
		changeGuess(guess) {
			self.input = guess
		},
		reset() {
			self.input = ''
			self.showAnswer = false
			getParent(self).list.getRandomCharacter()
		},
	}))
	.views(self => ({
		get diff() {
			return Math.abs(self.character.height - self.guessed)
		},
		get guessed() {
			try {
				return parseInt(self.input)
			} catch (e) {
				console.error(e)
				return 0
			}
		},
		get character() {
			return getParent(self).list.current
		},
	}))

export default GuessGame
