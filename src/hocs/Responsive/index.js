import React from 'react'

import MediaQuery from 'react-responsive'

const Mobile = ({ children }) => <MediaQuery maxWidth={629}>{children}</MediaQuery>
const Desktop = ({ children }) => <MediaQuery minWidth={630}>{children}</MediaQuery>

export default { Mobile, Desktop }
