import Koa = require('koa')
import Shopify, { ApiVersion, AuthQuery } from '@shopify/shopify-api'

export default async (ctx: Koa.ParameterizedContext, next: Koa.Next) => {
	try {
		/**
		 * 验证身份验证回调
		 */
		await Shopify.Auth.validateAuthCallback(
			ctx.req,
			ctx.res,
			(ctx.query as unknown) as AuthQuery
		) // req.query must be cast to unkown and then AuthQuery in order to be accepted

		/**
		 * 获取 token 如果是 离线应用 应保存到数据库
		 */
		const currentSession = await Shopify.Utils.loadCurrentSession(
			ctx.req,
			ctx.res
		)

		if (!currentSession) {
			ctx.status = 302
			ctx.redirect('/auth/install')
		} else {
			/**
			 * Register webhooks after OAuth completes
			 */
			const handleWebhookRequest = async (
				topic: string,
				shop: string,
				webhookRequestBody: string
			) => {
				// this handler is triggered when a webhook is sent by the Shopify platform to your application
			}
			const resp = await Shopify.Webhooks.Registry.register({
				path: '/webhooks',
				topic: 'PRODUCTS_CREATE',
				accessToken: currentSession.accessToken,
				shop: currentSession.shop,
				webhookHandler: handleWebhookRequest,
			})

			/**
			 * wherever you want your user to end up after OAuth completes
			 */
			ctx.body = {
				currentSession,
			}
		}
	} catch (error) {
		console.error(error) // in practice these should be handled more gracefully
		ctx.status = 302
		ctx.redirect('/auth/install')
	}
}
