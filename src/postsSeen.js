import { useCookies } from 'react-cookie';
const cookieName = 'seen';
export function useSeenPosts() {
	const [cookies, setCookie, removeCookie] = useCookies(['posts-seen']);
	if (!cookies.seen) {
		cookies.seen = [];
	}
	function addPostSeen(postId) {
		if (!cookies.seen.includes(postId)) {
			console.log('Adding', postId, 'to list of seen');
			cookies.seen.push(postId);
			setCookie(cookieName, cookies.seen, { sameSite: 'lax' });
		}
	}
	function clearPostsSeen() {
		removeCookie(cookieName);
	}

	return [cookies.seen, addPostSeen, clearPostsSeen];
}
