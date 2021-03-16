import path from 'path'
import Koa = require('koa')
import body from './koaBody'
import router from '../route'
import koaStatic from './koaStatic'

const koaViews = require('koa-views')

export default function (app: Koa) {
	
	app.use(body)
	app.use(koaStatic)
	app.use(
		koaViews(path.join(__dirname, '../../assets/view'), {
			extension: 'html',
		})
	)
	app.use(router.routes()).use(router.allowedMethods())
}
