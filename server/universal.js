const path = require('path')
const fs = require('fs')

const React = require('react')
const ReactDOMServer  = require('react-dom/server')
const {StaticRouter, Switch} = require('react-router-dom')

const App = require('../src/containers/App').default

module.exports = function universalLoader(req, res) {
  const filePath = path.resolve(__dirname, '..', 'public', 'index.html')

  fs.readFile(filePath, 'utf8', (err, htmlData)=>{
    if (err) {
      console.error('read err', err)
      return res.status(404).end()
    }
    const context = {}
    const markup = ReactDOMServer.renderToString(
      <StaticRouter location={req.url} context={context}>
        <App />
      </StaticRouter>
    );


    if (context.url) {
      // Somewhere a `<Redirect>` was rendered
      res.redirect(301, context.url)
    } else {
      // we're good, send the response
      const RenderedApp = htmlData.replace('{{SSR}}', markup)
      res.send(RenderedApp)
    }
  })
}
