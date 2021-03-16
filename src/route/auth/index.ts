import Koa from 'koa'
import Router = require('koa-router')
import install from './install'
import callback from './callback'

const router = new Router()

router.get('/', async (ctx: Koa.ParameterizedContext, next: Koa.Next) => {
	ctx.status = 302
	ctx.redirect('/auth/install')
})

router.get('/install', install)
router.get('/callback', callback)

export default router
