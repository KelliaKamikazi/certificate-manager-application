import React, { useCallback, useEffect, useState } from "react";
import "../../styles/commentForm.css";
import { useLocalStorageChange } from "../../useLocalStorageChange";
import { apiClient } from "../data/client";
import { CommentDto, UserDto } from "../data/certificate";

interface CommentFormProps {
  certificateId?: number;
  comments?: CommentDto[];
  onAddComment: (newComment: CommentDto) => void;
}

const CommentForm: React.FC<CommentFormProps> = ({
  comments,
  onAddComment,
}) => {
  const user = useLocalStorageChange("participant");
  const [comment, setComment] = useState("");

  const [showCommentForm, setShowCommentForm] = useState(false);
  const [users, setUsers] = useState<UserDto[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiClient;
        const fetchedParticipants = await response.getAllUsers();
        setUsers(fetchedParticipants.data);
      } catch (error) {
        console.error("Error fetching participants:", error);
      }
    };
    fetchData();
  }, []);
  const getUserName = (userId: number, users: UserDto[]) => {
    const user = users.find((user) => user.id === userId);
    return user ? user.firstName : "Invalid User";
  };

  const handleCommentChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setComment(e.target.value);
    },
    []
  );
  const handleAddComment = () => {
    const newComment = {
      userId: user?.id || 0,
      content: comment,
    } as CommentDto;

    onAddComment(newComment);
    setComment("");
    setShowCommentForm(false);
  };

  const toggleCommentForm = useCallback(() => {
    setShowCommentForm((prevState) => !prevState);
  }, []);

  return (
    <div className="comment-form-container">
      <div className="form-header">
        <button
          type="button"
          className="btn blue-btn"
          onClick={toggleCommentForm}
        >
          {showCommentForm ? "Cancel" : "New comment"}
        </button>
      </div>
      <div className="comment-body">
        {comments?.length ? (
          comments.map((comment) => (
            <div className="comment" key={comment.id}>
              <h2>
                User: <span>{getUserName(comment.userId, users)}</span>
              </h2>
              <h4>
                Comment: <span>{comment.content}</span>
              </h4>
            </div>
          ))
        ) : (
          <div>No Comments</div>
        )}
      </div>
      {showCommentForm && (
        <div className="comment-form">
          <label htmlFor="comment">{user?.firstName || "Anonymous"}*</label>
          <textarea
            id="comment"
            name="comment"
            rows={4}
            cols={50}
            placeholder="comment"
            value={comment}
            onChange={handleCommentChange}
          />
          <button
            type="button"
            className="btn red-btn"
            onClick={handleAddComment}
          >
            Send
          </button>
        </div>
      )}
    </div>
  );
};

export default CommentForm;
