import { useState, useEffect } from 'react';
import {
	CssBaseline,
	AppBar,
	Container,
	Typography,
	Button,
	listItemTextClasses,
} from '@mui/material';
import Post from './Post.js';

import './App.css';

function App() {
	const [data, setData] = useState(null);
	const [next, setNext] = useState('');

	useEffect(() => {
		getData();
	}, [next]);

	function getData(nextCursor) {
		console.log('🚨:App:8', 'Fetching data...');
		let url = 'http://localhost:8081/';
		if (nextCursor) {
			url += '?' + nextCursor;
		}

		console.log('🚨:App:20', 'url', url);
		fetch(url)
			.then((res) => res.json())
			.then((data) => {
				console.log('🚨:App:22', 'data', data);
				return setData(data);
			})
			.then(() => window.scrollTo(0, 0));
	}

	return (
		<div className="App">
			<CssBaseline />
			<AppBar position="sticky">
				<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
					MyGag
				</Typography>
			</AppBar>
			<Container maxWidth="lg">
				{data && (
					<ul>
						{data.posts.map((post) => {
							return <Post key={post.id} post={post} />;
						})}
					</ul>
				)}
			</Container>
			<Button onClick={() => getData(data.nextCursor)}>GIMME MORE</Button>
		</div>
	);
}

export default App;
