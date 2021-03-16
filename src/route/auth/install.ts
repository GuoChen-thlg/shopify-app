import Koa from 'koa'
import Shopify from '@shopify/shopify-api'

export default async (ctx: Koa.ParameterizedContext, next: Koa.Next) => {
	let shop: string = ctx.query.shop as string
	if (/[a-zA-Z0-9][a-zA-Z0-9\-]*\.myshopify\.com/.test(shop)) {
		let authRoute = await Shopify.Auth.beginAuth(
			ctx.req,
			ctx.res,
			shop,
			'/auth/callback',
			false
		)
		ctx.redirect(authRoute)
	} else {
		ctx.type = 'html'
		await ctx.render('install')
	}
}
