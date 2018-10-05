import React from 'react'
import { list } from '../models/Character'
import { observer } from 'mobx-react'

const Character = () => (
	<div>
		{list.current && list.current.name}
		<button onClick={() => list.getRandomCharacter()}>Bring new one!</button>
	</div>
)

export default observer(Character)
