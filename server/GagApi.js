const fetch = (...args) =>
	import('node-fetch').then(({ default: fetch }) => fetch(...args));
class GagApi {
	constructor() {
		this.nextCursor = null;
		this.url = 'https://9gag.com/v1/feed-posts/group/default/type/hot';
	}
	async getNext() {
		let url = this.url;
		if (this.nextCursor) {
			url += '?' + this.nextCursor;
		}
		const config = {
			headers: {
				accept: '*/*',
				'accept-language': 'en-US,en;q=0.9',
				'sec-ch-ua':
					'".Not/A)Brand";v="99", "Google Chrome";v="103", "Chromium";v="103"',
				'sec-ch-ua-mobile': '?0',
				'sec-ch-ua-platform': '"macOS"',
				'sec-fetch-dest': 'empty',
				'sec-fetch-mode': 'cors',
				'sec-fetch-site': 'same-origin',
			},
			referrer: 'https://9gag.com/',
			referrerPolicy: 'strict-origin-when-cross-origin',
			body: null,
			method: 'GET',
			mode: 'cors',
			credentials: 'include',
		};

		return fetch(url, config)
			.then((res) => res.json())
			.then((res) => {
				this.nextCursor = res.data.nextCursor;
				for(const post of res.data.posts){
					post.comments = await this.fetchComments(post.id);
				}
				return res.data;
			});
	}
	async fetchComments(postId) {
		return fetch(
			'https://comment-cdn.9gag.com/v2/cacheable/comment-list.json?appId=a_dd8f2b7d304a10edaf6f29517ea0ca4100a43d1b&count=10&type=hot&url=http%3A%2F%2F9gag.com%2Fgag%2F' +
				postId
		)
			.then((res) => res.json())
			.then((res) => res.payload);
	}
}
module.exports = { GagApi };
