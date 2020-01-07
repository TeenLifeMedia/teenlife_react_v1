import React, { Fragment } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import HomePage from 'pages/Home'
import Header from 'components/Header'
import Footer from 'components/Footer'

const Routes = () => (
  <BrowserRouter>
    <Fragment>
      <Header />
      <Switch>
        <Route exact path="/" component={HomePage} />
      </Switch>
      <Footer />
    </Fragment>
  </BrowserRouter>
)

export default Routes
