import http from 'http'
import { createServer } from 'http'

import app from './server'
let currentApp = app

app.listen(3000, () => {
	console.log('Now listening on localhost 3000')
})

if (module.hot) {
	module.hot.accept(['./server'], () => {
		app.removeListener('request', currentApp)
		app.on('request', app)
		currentApp = app
	})
}
