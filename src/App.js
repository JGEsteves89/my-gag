import { useState, useEffect } from 'react';
import { CssBaseline, AppBar, Typography, Button, Skeleton, Box } from '@mui/material';
import { useSwipeable } from 'react-swipeable';
import Post from './Post.js';
import fetchFilterData from './dataFilter.js';
import { useSeenPosts } from './postsSeen.js';
import './App.css';

function App() {
	const [data, setData] = useState(null);
	const [currentPost, setCurrentPost] = useState(0);
	const [seenPosts, addPostSeen, clearPostsSeen] = useSeenPosts();
	const swipeable = useSwipeable({
		delta: 50, // min distance(px) before a swipe starts. *See Notes*
		swipeDuration: 500,
		trackTouch: true, // track touch input
		trackMouse: false, // track mouse input
		onSwipedLeft: getNextPost,
		onSwipedRight: getPreviousPost,
	});

	useEffect(() => {
		console.log('Scrolling up...');
		window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
	}, [currentPost]);

	useEffect(() => {
		fetchFilterData(data, currentPost, seenPosts).then((res) => {
			if (res.needsRefresh) {
				setData(res.data);
			}
		});
	});

	function getNextPost() {
		if (currentPost < data.posts.length - 1) {
			setCurrentPost(currentPost + 1);
		}
	}

	function getPreviousPost() {
		if (currentPost !== 0) {
			setCurrentPost(currentPost - 1);
		}
	}

	if (data && data.posts) {
		addPostSeen(data.posts[currentPost].id);
	}

	return (
		<div className="App" {...swipeable}>
			<CssBaseline />
			<AppBar position="sticky">
				<Box
					sx={{
						display: 'flex',
						justifyContent: 'space-between',
						alignItems: 'center',
					}}>
					<Button variant="contained" sx={{ flexGrow: 2, margin: '0.2rem' }} onClick={getPreviousPost}>
						👈
					</Button>
					<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
						MyGag.3
					</Typography>
					<Button variant="contained" sx={{ flexGrow: 2, margin: '0.2rem' }} onClick={getNextPost}>
						👉
					</Button>
				</Box>
			</AppBar>
			<Box className="singlePostView">
				{data && currentPost !== -1 && <Post post={data.posts[currentPost]} />}
				{!data && <Skeleton variant="rectangular" className="postContainer" />}
			</Box>
			<Button size="small" onClick={() => clearPostsSeen}>
				ClearCookies
			</Button>
		</div>
	);
}

export default App;
