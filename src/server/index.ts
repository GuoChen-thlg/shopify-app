require('dotenv').config()

import Koa = require('koa')
import Shopify, { ApiVersion } from '@shopify/shopify-api'
import middleware from '../middleware'

const app = new Koa()

const { API_KEY, API_SECRET_KEY, SCOPES, HOST, PORT } = process.env

Shopify.Context.initialize({
	API_KEY,
	API_SECRET_KEY,
	SCOPES: [SCOPES],
	HOST_NAME: HOST,
	IS_EMBEDDED_APP: false,
	API_VERSION: ApiVersion.January21,
})
// 中间件
middleware(app)

const serverStart = () => {
	app.listen(PORT, () => {
		console.log('> http://localhost:%d', PORT)
	})
}

export default { start: serverStart }
