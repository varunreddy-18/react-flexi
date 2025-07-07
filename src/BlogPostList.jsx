import React from 'react';
import { Link } from 'react-router-dom';
import styles from './BlogPostList.module.css';

function highlight(text, query) {
  if (!query) return text;
  const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
  return text.split(regex).map((part, i) =>
    regex.test(part) ? <mark key={i} style={{background:'#fff59d',padding:0}}>{part}</mark> : part
  );
}

const BlogPostList = ({ posts, cardMode, onEdit, searchQuery }) => {
  if (!posts || posts.length === 0) {
    return <div className={styles.empty}>No blog posts found.</div>;
  }
  return (
    <div className={styles.listWrapper}>
      <h1 style={{ textAlign: 'center', color: 'black' }}>Blog Posts</h1>
      <ul className={styles.list}>
        {posts.map(post => (
          <li key={post.id} className={styles.item}>
            <Link to={`/post/${post.id}`} className={styles.link}>
              <div className={cardMode ? styles.card : styles.cardPlain}>
                <h2 className={styles.title}>{highlight(post.title, searchQuery)}</h2>
                <p className={styles.meta}>By {post.author} &middot; {new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
                <div className={styles.preview}>
                  {/* Optionally show a preview of content, e.g. first 100 chars */}
                  {highlight(post.content.replace(/<[^>]+>/g, '').slice(0, 100), searchQuery)}{post.content.replace(/<[^>]+>/g, '').length > 100 ? '...' : ''}
                </div>
              </div>
            </Link>
            {onEdit && (
              <button
                style={{marginTop:'8px',background:'#007BFF',color:'#fff',border:'none',borderRadius:'4px',padding:'6px 14px',cursor:'pointer',float:'right'}}
                onClick={e => { e.preventDefault(); onEdit(post.id); }}
              >Edit</button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BlogPostList;