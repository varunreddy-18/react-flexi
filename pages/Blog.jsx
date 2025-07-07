import React from 'react';

const Blog = () => (
  <section style={{maxWidth: 800, margin: '0 auto', padding: '32px 0'}}>
    <h1 style={{fontSize: '2rem', color: '#003366', marginBottom: 16}}>Blog</h1>
    <p style={{fontSize: '1.1rem', color: '#333', marginBottom: 24}}>
      Welcome to the Blog page! Here you'll find the latest posts, updates, and articles from our team. Use the search bar above to find posts by title or content, or browse the list for something interesting.
    </p>
    <p style={{fontSize: '1rem', color: '#666'}}>
      Want to contribute? Click the "+ Create New Post" button to share your thoughts with the community.
    </p>
  </section>
);

export default Blog;
