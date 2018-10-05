const { types, flow } = require('mobx-state-tree')

const Character = types.model('Character', {
	name: types.string,
	height: types.number,
})

export const CharacterList = types
	.model('CharacterList', {
		items: types.array(Character),
	})
	.actions(self => ({
		load: flow(function* load() {
			const res = yield window.fetch('https://swapi.co/api/people/')
			const json = yield res.json()

			self.items.push(
				...json.results.map(c => ({
					height: parseInt(c.height),
					name: c.name,
				}))
			)
		}),
	}))
