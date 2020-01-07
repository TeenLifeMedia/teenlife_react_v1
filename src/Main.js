import React, { useState } from 'react'

import ErrorState from 'components/ErrorState'
import { ErrorContext } from 'contexts/index'
import Routes from './Routes'

const Main = () => {
  const [error, setError] = useState(null)

  return !error ? (
    <ErrorContext.Provider value={setError}>
      <Routes />
    </ErrorContext.Provider>
  ) : (
    <ErrorState error={error} />
  )
}

export default Main
