import Router from 'koa-router'
import Koa from 'koa'
import mysql from '../models/db/mysql'

import auth from './auth'
import api from './api'
import webhooks from './webhooks'

const router = new Router()

/**
 * @description 
 */
router.get('/', async (ctx: Koa.ParameterizedContext, next: Koa.Next) => {
	try {
		let result: any = await mysql.query(
			'SELECT `info` FROM `msg` WHERE `id`=1'
		)
		console.log(result[0].info)
	} catch (error) {
		console.log(error)
	}
	await ctx.render('index')
})



/**
 * @description 安装认证 接口
 */
router.use('/auth', auth.routes())



/**
 * @description API 接口
 */
router.use('/api', api.routes())


/**
 * @description webhooks 接口
 */
router.use('/webhooks',webhooks.routes())



export default router
