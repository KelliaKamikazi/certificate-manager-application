import React, { useCallback, useEffect, useState } from "react";
import "../../styles/commentForm.css";
import { useLocalStorageChange } from "../../useLocalStorageChange";
import { apiClient } from "../data/client";
import { CommentDto, UserDto } from "../data/certificate";
import { useTranslation } from "../../useTranslation";

interface CommentFormProps {
  certificateId?: number;
  comments?: CommentDto[];
  onAddComment: (newComment: CommentDto) => void;
  isNewCertificate: boolean;
  onNewCommentClick: () => void;
}

const CommentForm: React.FC<CommentFormProps> = ({
  comments,
  onAddComment,
  isNewCertificate,
  onNewCommentClick,
}) => {
  const { t } = useTranslation();
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
    return user ? `${user.firstName} ${user.lastName}` : t("anonymous");
  };

  const handleCommentChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setComment(e.target.value);
    },
    []
  );

  const handleAddComment = () => {
    if (comment) {
      const newComment = {
        userId: user?.id || 0,
        content: comment,
      } as CommentDto;

      onAddComment(newComment);
      setComment("");
      setShowCommentForm(false);
    }
  };

  const toggleCommentForm = () => {
    if (isNewCertificate) {
      onNewCommentClick();
    } else {
      setShowCommentForm((prevState) => !prevState);
    }
  };

  return (
    <div className="comment-form-container">
      <div className="form-header">
        <button
          type="button"
          className={`btn blue-btn ${isNewCertificate ? "disabled" : ""}`}
          onClick={toggleCommentForm}
        >
          {showCommentForm ? t("cancel") : t("newComment")}
        </button>
      </div>
      <div className="comment-body">
        {comments?.length ? (
          comments.map((comment) => (
            <div className="comment" key={comment.id}>
              <h2>
                {t("user")}: <span>{getUserName(comment.userId, users)}</span>
              </h2>
              <h4>
                {t("comment")}: <span>{comment.content}</span>
              </h4>
            </div>
          ))
        ) : (
          <div>{t("commentSection")}</div>
        )}
      </div>
      {showCommentForm && !isNewCertificate && (
        <div className="comment-form">
          <label htmlFor="comment">{user?.firstName || t("anonymous")}*</label>
          <textarea
            id="comment"
            name="comment"
            rows={4}
            cols={50}
            placeholder={t("commentPlaceholder")}
            value={comment}
            onChange={handleCommentChange}
          />
          <button
            type="button"
            className="btn red-btn"
            onClick={handleAddComment}
          >
            {t("send")}
          </button>
        </div>
      )}
    </div>
  );
};

export default CommentForm;
