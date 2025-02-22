package data.entities;

import jakarta.persistence.*;

@Entity
@Table(name = "comments", schema = "certificates")
public class CommentEntity {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @ManyToOne
  @JoinColumn(name = "certificate_id")
  private CertificateEntity certificate;

  @ManyToOne private UserEntity user;

  private String content;

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public CertificateEntity getCertificate() {
    return certificate;
  }

  public void setCertificate(CertificateEntity certificate) {
    this.certificate = certificate;
  }

  public UserEntity getUser() {
    return user;
  }

  public void setUser(UserEntity user) {
    this.user = user;
  }

  public String getContent() {
    return content;
  }

  public void setContent(String content) {
    this.content = content;
  }
}
