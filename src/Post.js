import { useRef } from 'react';
import {
	Paper,
	Container,
	Typography,
	List,
	ListItem,
	ListItemAvatar,
	Avatar,
	ListItemText,
	Box,
} from '@mui/material';
import ReactPlayer from 'react-player/file';

function Post(props) {
	const ref = useRef(null);
	const post = props.post;

	return (
		<Paper className="postContainer">
			<Container className=" flexContentCenter">
				<Typography
					variant="h5"
					className="title"
					component="div"
					sx={{ flexGrow: 1, color: 'white' }}>
					{post.title}
				</Typography>
			</Container>
			<Box
				maxWidth="95%"
				className="postAndCommentsContainer flexContentCenter">
				<Container ref={ref} className="postMedia flexContentCenter">
					{post.images.image460sv && (
						<ReactPlayer
							url={[
								{
									src: post.images.image460sv.url,
								},
							]}
							playing={true}
							height="80vh"
							controls={true}
							muted={false}
						/>
					)}
					{!post.images.image460sv && (
						<img
							src={post.images.image700.webpUrl}
							alt={post.title}
							width="100%"
							loading="lazy"
						/>
					)}
				</Container>
				<Box
					className="commentsContainer"
					style={{
						overflow: 'auto',
						minHeight: '75vh',
					}}>
					<List className="commentsList">
						{post.comments.comments.map((comment) => {
							if (comment.user.displayName === 'kiidcharlemagne') {
								console.log('🚨:App:79', 'comment', comment);
							}
							return (
								<ListItem key={comment.commentId} alignItems="flex-start">
									<ListItemAvatar>
										<Avatar
											alt={comment.user.displayName}
											src={comment.user.avatarUrl}
										/>
									</ListItemAvatar>
									<Container className="flexContainer">
										<ListItemText
											primary={comment.text}
											secondary={comment.user.displayName}
										/>
										{(comment.media &&
											comment.media[0] &&
											comment.media[0].imageMetaByType &&
											comment.media[0].imageMetaByType.video && (
												<ReactPlayer
													url={[
														{
															src: comment.media[0].imageMetaByType.video.url,
														},
													]}
													width={
														comment.media[0].imageMetaByType.video.width / 2
													}
													height={
														comment.media[0].imageMetaByType.video.height / 2
													}
													controls={true}
													muted={true}
												/>
											)) ||
											(comment.media &&
												comment.media[0] &&
												comment.media[0].imageMetaByType &&
												comment.media[0].imageMetaByType.image && (
													<img
														alt={comment.user.displayName}
														style={{
															width: '100%',
															height: 'auto',
														}}
														src={comment.media[0].imageMetaByType.image.url}
													/>
												))}
									</Container>
								</ListItem>
							);
						})}
					</List>
				</Box>
			</Box>
		</Paper>
	);
}

export default Post;
