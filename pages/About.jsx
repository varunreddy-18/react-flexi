import React from 'react';

const About = () => (
  <section style={{maxWidth: 800, margin: '0 auto', padding: '32px 0'}}>
    <h1 style={{fontSize: '2rem', color: '#003366', marginBottom: 16}}>About</h1>
    <p style={{fontSize: '1.1rem', color: '#333', marginBottom: 24}}>
      This is a modern, responsive blog application built with React and Vite. It demonstrates best practices in UI/UX, accessibility, and responsive design.
    </p>
    <ul style={{fontSize: '1rem', color: '#666', marginLeft: 24}}>
      <li>View, create, edit, and delete blog posts</li>
      <li>Comment on posts and join the discussion</li>
      <li>Search for posts by title or content</li>
      <li>Enjoy a seamless experience on desktop and mobile</li>
    </ul>
    <p style={{marginTop: 24, color: '#999'}}>© 2025 BlogApp. All rights reserved.</p>
  </section>
);

export default About;
