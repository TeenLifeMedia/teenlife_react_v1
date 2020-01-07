const { JSDOM } = require('jsdom')

const url = 'http://localhost'
const exposedProperties = ['window', 'navigator', 'document']
const dom = new JSDOM('<!doctype html><html><body></body></html>', { url })
global.window = dom.window
global.HTMLElement = dom.window.document.defaultView.HTMLElement
global.Blob = dom.window.Blob
global.HTMLAnchorElement = dom.window.HTMLAnchorElement
global.Node = window.Node
global.HTMLUnknownElement = window.HTMLUnknownElement

Object.keys(dom.window).forEach((property) => {
  if (typeof global[property] === 'undefined') {
    exposedProperties.push(property)
    global[property] = dom.window[property]
  }
})

if (!global.SVGSVGElement && global.HTMLUnknownElement) {
  global.SVGSVGElement = global.HTMLUnknownElement
}

global.navigator = {
  userAgent: 'node.js',
}
