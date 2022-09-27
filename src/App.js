import { useState, useEffect } from 'react';
import {
	CssBaseline,
	AppBar,
	Typography,
	Button,
	Skeleton,
	Box,
} from '@mui/material';

import Post from './Post.js';
import fetchFilterData from './dataFilter.js';
import { useSeenPosts } from './postsSeen.js';
import './App.css';

function App() {
	const [data, setData] = useState(null);
	const [currentPost, setCurrentPost] = useState(0);
	const [seenPosts, addPostSeen, clearPostsSeen] = useSeenPosts();

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
		<div className="App">
			<CssBaseline />
			<AppBar position="sticky">
				<Box
					sx={{
						display: 'flex',
						justifyContent: 'space-between',
						alignItems: 'center',
					}}>
					<Button
						variant="contained"
						sx={{ flexGrow: 2, margin: '0.2rem' }}
						onClick={getPreviousPost}>
						👈
					</Button>
					<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
						MyGag
					</Typography>
					<Button
						variant="contained"
						sx={{ flexGrow: 2, margin: '0.2rem' }}
						onClick={getNextPost}>
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
