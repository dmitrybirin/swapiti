import { types, flow } from 'mobx-state-tree'
import { v4 } from 'uuid'

const Character = types.model('Character', {
	id: types.identifier,
	name: types.string,
	height: types.number,
})

const CharacterList = types
	.model('CharacterList', {
		items: types.array(Character),
		current: types.maybeNull(types.reference(Character), null),
		loading: types.boolean,
	})
	.actions(self => ({
		load: flow(function* load() {
			try {
				self.loading = true
				const res = yield window.fetch('https://swapi.co/api/people/')
				const json = yield res.json()
				self.items.push(
					...json.results.map(c => ({
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

export const list = CharacterList.create({ items: [], loading: false })
