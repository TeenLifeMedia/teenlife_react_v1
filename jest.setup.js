import '@testing-library/jest-dom/extend-expect'
import '@testing-library/react/cleanup-after-each'

window.matchMedia = jest.fn().mockImplementation((query) => {
  return {
    matches: true,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
  }
})
window.scrollTo = () => { }
