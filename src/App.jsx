import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, Link, useParams } from 'react-router-dom';
import BlogPostList from './BlogPostList.jsx';
import BlogPostPage from '../pages/BlogPostPage.jsx';
import BlogPostForm from '../components/BlogPostForm.jsx';
import './App.css';

const initialPosts = [
	{
		id: '1',
		title: 'How to Build a Blog Viewer in React',
		content: `<p>This is a <strong>sample blog post</strong> to demonstrate the <a href='https://react.dev'>React</a> BlogPostDetail component. You can include <em>HTML</em> elements, lists, and more!</p><ul><li>Responsive design</li><li>Accessibility</li><li>Modern UI</li></ul>`,
		author: 'Jane Doe',
		date: '2023-01-01',
	},
	{
		id: '2',
		title: 'Second Blog Post',
		content: `<p>This is another blog post. <a href='https://vitejs.dev'>Vite</a> makes development fast!</p>`,
		author: 'John Smith',
		date: '2024-05-10',
	},
	{
		id: 'specs',
		title: 'Blog Post Viewing Feature Specifications',
		content: `<p>This post describes the <strong>specifications</strong> for the Blog Post Viewing Feature. <a href='/post/specs'>Click here to view the full requirements and UI/UX details.</a></p><ul><li>Content display</li><li>Responsiveness</li><li>Accessibility</li><li>Styling</li></ul>`,
		author: 'Product Team',
		date: '2025-06-12',
	},
];

function App() {
	const [posts, setPosts] = useState(initialPosts);
	const navigate = useNavigate();

	// Create new post
	const handleCreate = (data) => {
		const newPost = {
			...data,
			id: (Date.now() + Math.random()).toString(),
		};
		setPosts([newPost, ...posts]);
		navigate('/');
	};

	// Edit post
	const handleEdit = (id, data) => {
		setPosts(posts.map((post) => (post.id === id ? { ...post, ...data } : post)));
		navigate(`/post/${id}`);
	};

	// Find post by id
	const findPost = (id) => posts.find((post) => post.id === id);

	return (
		<>
			<header className="header">
				<h1 className="headerTitle">Flexi Blog</h1>
				<p className="headerSubtitle">A modern, responsive blog built with React & Vite</p>
				<div style={{ textAlign: 'right', margin: '16px 0' }}>
					<Link
						to="/new"
						style={{
							background: '#007BFF',
							color: '#fff',
							padding: '8px 16px',
							borderRadius: '4px',
							textDecoration: 'none',
							fontWeight: 'bold',
						}}
					>
						+ Create New Post
					</Link>
				</div>
			</header>
			<main style={{ background: '#f5f6fa', minHeight: '100vh', padding: 0 }}>
				<Routes>
					<Route
						path="/"
						element={<BlogPostList posts={posts} cardMode={true} onEdit={(id) => navigate(`/edit/${id}`)} />}
					/>
					<Route
						path="/post/:id"
						element={<BlogPostPage posts={posts} cardMode={false} onEdit={(id) => navigate(`/edit/${id}`)} />}
					/>
					<Route path="/new" element={<BlogPostForm onSubmit={handleCreate} />} />
					<Route path="/edit/:id" element={<EditWrapper posts={posts} onEdit={handleEdit} />} />
				</Routes>
				{/* Floating Add Button as per specifications */}
				<button
					onClick={() => navigate('/new')}
					className="addBlogButton"
					title="Add New Blog Post"
					aria-label="Add New Blog Post"
					style={{
						position: 'fixed',
						bottom: 32,
						right: 32,
						zIndex: 1000,
						background: '#007BFF',
						color: '#fff',
						border: 'none',
						borderRadius: '50%',
						width: 64,
						height: 64,
						boxShadow: '0 4px 24px rgba(0,0,0,0.18)',
						fontSize: 36,
						fontWeight: 'bold',
						cursor: 'pointer',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						transition: 'background 0.2s, box-shadow 0.2s',
					}}
					onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); navigate('/new'); } }}
				>
					<span aria-hidden="true" style={{fontSize: 40, lineHeight: 1, marginTop: -2}}>+</span>
				</button>
			</main>
		</>
	);
}

function EditWrapper({ posts, onEdit }) {
	const { id } = useParams();
	const post = posts.find((p) => p.id === id);
	if (!post) return <div style={{ textAlign: 'center', margin: '40px' }}>Post not found.</div>;
	return <BlogPostForm post={post} onSubmit={(data) => onEdit(id, data)} />;
}

export default App;
