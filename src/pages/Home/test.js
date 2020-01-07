import React from 'react'
import { render, cleanup } from '@testing-library/react'

import Home from '.'

describe('<Home />', () => {
	afterEach(cleanup);
	it('exists', () => {
		const wrapper = <Home />
		const { getByTestId } = render(wrapper)
		const node = getByTestId("Home")

		expect(node).toBeDefined()
	})

})