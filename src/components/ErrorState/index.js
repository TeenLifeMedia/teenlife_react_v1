import React from 'react'

const getErrorPage = (error) => {
  switch (error) {
    case 404:
      return "Sorry, the page you are looking for cannot be found"
    case 403:
      return "You are not authorized to view this page."
    case 503:
      return "Unfortunately the site is currently unavailable."
    default:
      return "Something unexpected has happened"
  }
}

const ErrorPage = (props) => {
  const { error } = props

  return <div>{getErrorPage(error)}</div>
}

export default ErrorPage
