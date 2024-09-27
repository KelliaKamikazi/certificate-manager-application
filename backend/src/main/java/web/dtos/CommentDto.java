package web.dtos;

public class CommentDto {

    private Long id;
    private Long certificateId;
    private Long userId;
    private String content;


    public CommentDto() {
    }

    public CommentDto(Long id, Long certificateId, Long userId, String content) {
        this.id = id;
        this.certificateId = certificateId;
        this.userId = userId;
        this.content = content;

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

    @Override
    public String toString() {
        return "CommentDto{" +
                "id=" + id +
                ", certificateId=" + certificateId +
                ", userId=" + userId +
                ", content='" + content + '\'' +
                '}';
    }
}
