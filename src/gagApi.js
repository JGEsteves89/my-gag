let nextCursor = null;
export default async function fetchPostAndComments() {
	let url = 'https://my-gag.ijimiguel.workers.dev/hot';
	if (nextCursor) {
		url += '?' + nextCursor;
	}

	return fetch(url)
		.then((res) => res.json())
		.then((data) => {
			nextCursor = data.nextCursor;
			return data;
		});
}
