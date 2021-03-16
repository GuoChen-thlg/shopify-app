import Koa from 'koa'
import Router from 'koa-router'
import Shopify from '@shopify/shopify-api'
const router = new Router()

router.post('/', async (ctx: Koa.Context, next: Koa.Next) => {
	try {
		await Shopify.Webhooks.Registry.process(ctx.req, ctx.res)
	} catch (error) {
		console.log(error)
	}
})





export default router
