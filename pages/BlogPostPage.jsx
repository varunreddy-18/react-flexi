import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import BlogPostDetail from '../components/BlogPostDetail';
import DeleteButton from '../components/DeleteButton';
import ConfirmationDialog from '../components/ConfirmationDialog';
import CommentList from '../components/CommentList';
import CommentForm from '../components/CommentForm';

const BlogPostPage = ({ posts, onEdit, onDelete }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const post = posts.find(p => p.id === id);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [comments, setComments] = useState([]);

  const handleDelete = async () => {
    setDeleting(true);
    await onDelete(id);
    setDeleting(false);
    setDialogOpen(false);
    navigate('/');
  };

  const handleAddComment = (comment) => {
    setComments(prev => [...prev, comment]);
  };

  return (
    <div>
      <BlogPostDetail {...(post || {})} />
      {post && (
        <div style={{textAlign:'right',margin:'24px 0',display:'flex',justifyContent:'flex-end',gap:'12px'}}>
          <button
            style={{background:'#007BFF',color:'#fff',padding:'8px 16px',borderRadius:'4px',border:'none',fontWeight:'bold',cursor:'pointer'}}
            onClick={() => onEdit && onEdit(id)}
          >Edit Post</button>
          <DeleteButton onClick={() => setDialogOpen(true)} disabled={deleting} />
        </div>
      )}
      <ConfirmationDialog
        isOpen={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onConfirm={handleDelete}
        loading={deleting}
      />
      {/* Comment System */}
      <section aria-label="Comments" style={{maxWidth:800,margin:'0 auto'}}>
        <h2 style={{fontSize:'1.5rem',margin:'32px 0 16px 0',color:'#003366'}}>Comments</h2>
        <CommentList comments={comments} />
        <CommentForm onSubmit={handleAddComment} isLoggedIn={false} />
      </section>
    </div>
  );
};

export default BlogPostPage;
