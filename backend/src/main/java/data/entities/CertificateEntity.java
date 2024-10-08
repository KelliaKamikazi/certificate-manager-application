package data.entities;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "certificates", schema = "certificates")
public class CertificateEntity {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @ManyToOne
  @JoinColumn(name = "supplier_id", nullable = false)
  private SupplierEntity supplier;

  @Enumerated(EnumType.STRING)
  @Column(name = "certificate_type")
  private CertificateType certificateType;

  @Column(name = "valid_from")
  private LocalDateTime validFrom;

  @Column(name = "valid_to")
  private LocalDateTime validTo;

  @Lob
  @Column(name = "pdf_url")
  private String pdfUrl;

  @ManyToMany
  @JoinTable(
      name = "assigned_users",
      schema = "certificates",
      joinColumns = @JoinColumn(name = "certificate_id"),
      inverseJoinColumns = @JoinColumn(name = "user_id"))
  private Set<UserEntity> assignedUsers = new HashSet<>();

  @OneToMany(mappedBy = "certificate", cascade = CascadeType.ALL, orphanRemoval = true)
  private List<CommentEntity> comments = new ArrayList<>();

  public CertificateEntity() {}

  public CertificateEntity(
      Long id,
      SupplierEntity supplier,
      CertificateType certificateType,
      LocalDateTime validFrom,
      LocalDateTime validTo,
      String pdfUrl,
      Set<UserEntity> assignedUsers,
      List<CommentEntity> comments) {
    this.id = id;
    this.supplier = supplier;
    this.certificateType = certificateType;
    this.validFrom = validFrom;
    this.validTo = validTo;
    this.pdfUrl = pdfUrl;
    this.assignedUsers = assignedUsers;
    this.comments = comments;
  }

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public SupplierEntity getSupplier() {
    return supplier;
  }

  public void setSupplier(SupplierEntity supplier) {
    this.supplier = supplier;
  }

  public CertificateType getCertificateType() {
    return certificateType;
  }

  public void setCertificateType(CertificateType certificateType) {
    this.certificateType = certificateType;
  }

  public LocalDateTime getValidFrom() {
    return validFrom;
  }

  public void setValidFrom(LocalDateTime validFrom) {
    this.validFrom = validFrom;
  }

  public LocalDateTime getValidTo() {
    return validTo;
  }

  public void setValidTo(LocalDateTime validTo) {
    this.validTo = validTo;
  }

  public String getPdfUrl() {
    return pdfUrl;
  }

  public void setPdfUrl(String pdfUrl) {
    this.pdfUrl = pdfUrl;
  }

  public Set<UserEntity> getAssignedUsers() {
    return assignedUsers;
  }

  public void setAssignedUsers(Set<UserEntity> assignedUsers) {
    this.assignedUsers = assignedUsers;
  }

  public List<CommentEntity> getComments() {
    return comments;
  }

  public void setComments(List<CommentEntity> commentEntities) {
    this.comments = comments;
  }
}
