import React from 'react'
import { render } from '@testing-library/react'
import ErrorState from '.'

describe('<ErrorState />', () => {
  it('Renders NotFoundErrorPage for 404', () => {
    const wrapper = <ErrorState error={404} />
    const { getByText } = render(wrapper)
    const errorNode = getByText(/Sorry, the page you are looking for cannot be found/)

    expect(errorNode).toBeDefined()
  })

  it('Renders ForbiddenErrorPage for 403', () => {
    const wrapper = <ErrorState error={403} />
    const { getByText } = render(wrapper)
    const errorNode = getByText(/You are not authorized to view this page./)

    expect(errorNode).toBeDefined()
  })

  it('Renders ServiceUnavailableErrorPage for 503', () => {
    const wrapper = <ErrorState error={503} />
    const { getByText } = render(wrapper)
    const errorNode = getByText(/Unfortunately the site is currently unavailable./)

    expect(errorNode).toBeDefined()
  })

  it('Defaults to InternalServerErrorPage', () => {
    const wrapper = <ErrorState error={'weeble-wobble'} />
    const { getByText } = render(wrapper)
    const errorNode = getByText(/Something unexpected has happened/)

    expect(errorNode).toBeDefined()
  })
})
