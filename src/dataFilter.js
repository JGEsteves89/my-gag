import fetchPostAndComments from './gagApi.js';
const minNumOfPosts = 10;
function mergeData(oldData, newData) {
	let copy;
	if (oldData) {
		copy = { ...oldData };
		copy.nextCursor = newData.nextCursor;
		copy.posts = copy.posts.concat(newData.posts);
	} else {
		copy = newData;
	}
	return copy;
}

function filterData(data, postsSeen) {
	data.posts = data.posts.filter((p) => !postsSeen.includes(p.id));
	return data;
}
function getNumberOfNewPosts(data, postsSeen) {
	return !data ? 0 : data.posts.filter((p) => !postsSeen.includes(p.id)).length;
}
export default async function fetchFilterData(
	dataIn,
	currentPost,
	postsSeen,
	needsRefresh = false
) {
	const numberOfNewPosts = getNumberOfNewPosts(dataIn, postsSeen);
	if (numberOfNewPosts > minNumOfPosts) {
		return { data: dataIn, needsRefresh };
	}

	return fetchPostAndComments().then((newData) => {
		newData = filterData(newData, postsSeen);
		console.log('Fetched new posts...', newData.posts.length);
		let mergedData = mergeData(dataIn, newData);
		return fetchFilterData(mergedData, currentPost, postsSeen, true);
	});
}
