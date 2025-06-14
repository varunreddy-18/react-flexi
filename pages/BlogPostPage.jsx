import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import BlogPostDetail from '../components/BlogPostDetail';
import DeleteButton from '../components/DeleteButton';
import ConfirmationDialog from '../components/ConfirmationDialog';

const BlogPostPage = ({ posts, onEdit, onDelete }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const post = posts.find(p => p.id === id);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    setDeleting(true);
    await onDelete(id);
    setDeleting(false);
    setDialogOpen(false);
    navigate('/');
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
    </div>
  );
};

export default BlogPostPage;
