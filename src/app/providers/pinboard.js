import fetch from 'isomorphic-fetch'
import qs from 'qs'

export async function getRecentBookmarks(tags) {
	const query = qs.stringify({
		auth_token: process.env.PINBOARD_API_TOKEN,
		tag: tags,
		format: 'json'
	})
	const res = await fetch(`https://api.pinboard.in/v1/posts/recent?${query}`)
	const data = await res.json()
	return data.posts
}