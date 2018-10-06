import { types, addMiddleware } from 'mobx-state-tree'
import makeInspectable from 'mobx-devtools-mst'
import CharacterList from './CharacterList'
import GuessGame from './GuessGame'

const Store = types.model({
	list: CharacterList,
	game: GuessGame,
})

let store = Store.create({
	list: { items: [], loading: false },
	game: {
		input: '',
		showAnswer: false,
	},
})

if (process.env.NODE_ENV === 'development') {
	store = makeInspectable(store)
	addMiddleware(store, (call, next) => {
		console.log(`${call.type} ::: ${call.name}`)
		return next(call)
	})
}

export default store
