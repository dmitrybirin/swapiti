import { types, flow, onPatch } from 'mobx-state-tree'
import { v4 } from 'uuid'

const getGifUrl = name =>
	`https://api.giphy.com/v1/gifs/search?api_key=21hoXy1MH3bBJFIfGP5uXlWjwtTGwMP8&q=star%20wars%20${encodeURIComponent(
		name
	)}&limit=20`

const getRandomElement = array => array[Math.floor(Math.random() * array.length)]

export const Character = types
	.model('Character', {
		id: types.identifier,
		name: types.string,
		height: types.number,
		image: types.maybe(types.string),
	})
	.actions(self => ({
		loadImage: flow(function* load() {
			const res = yield window.fetch(getGifUrl(self.name))
			const json = yield res.json()
			self.image = getRandomElement(json.data).images.original.url
		}),
	}))

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
			self.current = getRandomElement(self.items)
		},
		afterCreate() {
			onPatch(self, patch => {
				if (patch.op === 'replace' && patch.path === '/current') {
					self.current.loadImage()
				}
			})
		},
	}))

export default CharacterList
