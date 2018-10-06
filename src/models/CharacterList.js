import { types, flow } from 'mobx-state-tree'
import { v4 } from 'uuid'

export const Character = types.model('Character', {
	id: types.identifier,
	name: types.string,
	height: types.number,
})

const CharacterList = types
	.model('CharacterList', {
		items: types.array(Character),
		current: types.maybe(types.reference(Character)),
		loading: types.boolean,
	})
	.actions(self => ({
		load: flow(function* load() {
			try {
				self.loading = true
				let data
				if (localStorage.getItem('swapidata')) {
					data = JSON.parse(localStorage.getItem('swapidata'))
				} else {
					const res = yield window.fetch('https://swapi.co/api/people/')
					const json = yield res.json()
					data = json.results
					localStorage.setItem('swapidata', JSON.stringify(data))
				}
				self.items.push(
					...data.map(c => ({
						id: v4(),
						height: parseInt(c.height),
						name: c.name,
					}))
				)
			} catch (e) {
				throw ('Error, while loading:\n', e)
			} finally {
				self.loading = false
			}
		}),
		getRandomCharacter() {
			self.current = self.items[Math.floor(Math.random() * self.items.length)]
		},
	}))

export default CharacterList
