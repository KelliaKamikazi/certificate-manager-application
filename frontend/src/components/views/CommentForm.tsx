import React, { useCallback, useEffect, useState } from "react";
import "../../styles/commentForm.css";
import { useLocalStorageChange } from "../../useLocalStorageChange";
import { apiClient } from "../data/client";
import { CommentDto, UserDto } from "../data/certificate";

interface CommentFormProps {
  certificateId?: number;
  comments?: CommentDto[];
}

const CommentForm: React.FC<CommentFormProps> = ({
  certificateId,
  comments,
}) => {
  const user = useLocalStorageChange("participant");
  const [comment, setComment] = useState("");
  const [, setIsSubmitting] = useState(false);
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
  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!comment.trim() || !user || certificateId === undefined) return;

      setIsSubmitting(true);

      const commentDto: CommentDto = {
        userId: parseInt(user.id, 10),
        certificateId: certificateId,
        content: comment,
        id: 0,
      };

      try {
        await apiClient.createComment(commentDto);

        setComment("");
      } catch (error) {
        console.error("Error saving comment:", error);
      } finally {
        setIsSubmitting(false);
      }
    },
    [comment, user, certificateId]
  );

  const handleCommentChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setComment(e.target.value);
    },
    []
  );
  const toggleCommentForm = useCallback(() => {
    setShowCommentForm((prevState) => !prevState);
  }, []);

  return (
    <div className="comment-form-container">
      <div className="form-header">
        <button className="btn blue-btn" onClick={toggleCommentForm}>
          {showCommentForm ? "Cancel" : "New comment"}
        </button>
      </div>
      <div className="comment-body">
        {comments?.length ? (
          comments.map((comment) => (
            <div className="comment">
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
      <form className="comment-form" onSubmit={handleSubmit}>
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
        <button type="submit" className="btn red-btn"></button>
      </form>
    </div>
  );
};

export default CommentForm;
