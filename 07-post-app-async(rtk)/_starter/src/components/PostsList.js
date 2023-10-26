import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPostsAction } from "../store/slices/postSlice";

import SearchPost from "./SearchPost";
import "./Posts.css";

const PostsList = () => {
	const dispatch = useDispatch();
	const { postsData, loading, error } = useSelector((state) => state.posts);

	useEffect(() => {
		dispatch(fetchPostsAction());
	}, []);

	if (loading) return <h1>Loading....</h1>;
	if (error) return <h1>{error}</h1>;

	return (
		<>
			<SearchPost />
			<div className="posts-list">
				<h1>Total Posts : 0</h1>
				{postsData.map((post) => (
					<div className="post-details" key={post.id}>
						<h3>{post.title}</h3>
						<p>{post.body}</p>
					</div>
				))}
			</div>
		</>
	);
};

export default PostsList;
