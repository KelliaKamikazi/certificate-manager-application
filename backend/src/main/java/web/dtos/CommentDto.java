package web.dtos;

import java.time.LocalDateTime;

public class CommentDto {

    private Long id;
    private Long certificateId;
    private Long userId;
    private String content;
    private LocalDateTime timestamp;

    public CommentDto() {
    }

    public CommentDto(Long id, Long certificateId, Long userId, String content, LocalDateTime timestamp) {
        this.id = id;
        this.certificateId = certificateId;
        this.userId = userId;
        this.content = content;
        this.timestamp = timestamp;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getCertificateId() {
        return certificateId;
    }

    public void setCertificateId(Long certificateId) {
        this.certificateId = certificateId;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public LocalDateTime getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(LocalDateTime timestamp) {
        this.timestamp = timestamp;
    }
    @Override
    public String toString() {
        return "CommentDto{" +
                "id=" + id +
                ", certificateId=" + certificateId +
                ", userId=" + userId +
                ", content='" + content + '\'' +
                ", timestamp=" + timestamp +
                '}';
    }
}
