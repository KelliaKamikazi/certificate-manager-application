import React from 'react';
import '../../styles/commentForm.css';
import { useLocalStorageChange } from '../../useLocalStorageChange'; // Import the new hook

const CommentForm: React.FC = () => {
  const user = useLocalStorageChange('participant');

  return (
    <div className="comment-form-container">
      <div className="form-header">
        <button className="btn blue-btn">New comment</button>
      </div>
      <div className="comment-body">
        <div className="comment">
          <h2>
            User: <span>{user}</span>
          </h2>
          <h4>
            Comment: <span>Comment description</span>
          </h4>
        </div>
      </div>
      <form className="comment-form">
        <label htmlFor="comment">{user || 'Anonymous'}*</label>
        <textarea
          id="comment"
          name="comment"
          rows={4}
          cols={50}
          placeholder="comment"
        ></textarea>
        <button className="btn red-btn">Send</button>
      </form>
    </div>
  );
};

export default CommentForm;
