// const router = Router()

// router.post('/', async (request, env) => {
// 	const json = await request.json()
// 	const longLink = json?.url
//* generate a random slug - this is not cryptographically random but works
// 	let slug = btoa(Math.random() + '').slice(0, 9)
//* generate a new slug if the previous one is already existing
// 	let existing = await env.SHORTENER_KV.get(slug)
// 	while (existing) {
// 		slug = btoa(Math.random() + '').slice(0, 9)
// 		existing = await env.SHORTENER_KV.get(slug)
// 	}
//* generate shortened URL and return to user
// 	await env.SHORTENER_KV.put(slug, longLink)
// 	return new Response(JSON.stringify({ url: `${env.HOST_URL}/${slug}` }), {
// 		headers: { 'content-type': 'application/json' },
// 	})
// })

// router.get('/:slug', async (request, env) => {
// 	const slug = request.params.slug
// 	const redirectTo = await env.SHORTENER_KV.get(slug)
// 	if (redirectTo) {
// 		return Response.redirect(redirectTo, 302)
// 	}
// 	return new Response('URL not found', {
// 		status: 404,
// 	})
// })

// export default {
// 	async fetch(request, env, ctx) {
// 		return router.handle(request, env, ctx).then((res) => {
// 			console.log('HTTP Response', request.url, res.status)
// 			return res
// 		})
// 	},
// }
