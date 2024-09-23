package data.entities;

import jakarta.persistence.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "certificates",schema = "application")
public class CertificateEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    private SupplierEntity supplierEntity;
    @Enumerated(EnumType.STRING)
    private CertificateType certificateType;
    private LocalDate validFrom;
    private LocalDate validTo;
    @Lob
    private String pdfUrl;

    @ManyToMany
    @JoinTable(
            name = "assigned_users",
            schema = "application",
            joinColumns = @JoinColumn(name = "certificate_id"),
            inverseJoinColumns = @JoinColumn(name = "user_id")
    )
    private Set<UserEntity> assignedUserEntities = new HashSet<>();

    @OneToMany(mappedBy = "certificate", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<CommentEntity> commentEntities = new ArrayList<>();

    public CertificateEntity() {
    }

    public CertificateEntity(Long id, SupplierEntity supplierEntity, CertificateType certificateType, LocalDate validFrom, LocalDate validTo, String pdfUrl, Set<UserEntity> assignedUserEntities, List<CommentEntity> commentEntities) {
        this.id = id;
        this.supplierEntity = supplierEntity;
        this.certificateType = certificateType;
        this.validFrom = validFrom;
        this.validTo = validTo;
        this.pdfUrl = pdfUrl;
        this.assignedUserEntities = assignedUserEntities;
        this.commentEntities = commentEntities;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public SupplierEntity getSupplier() {
        return supplierEntity;
    }

    public void setSupplier(SupplierEntity supplierEntity) {
        this.supplierEntity = supplierEntity;
    }

    public CertificateType getCertificateType() {
        return certificateType;
    }

    public void setCertificateType(CertificateType certificateType) {
        this.certificateType = certificateType;
    }

    public LocalDate getValidFrom() {
        return validFrom;
    }

    public void setValidFrom(LocalDate validFrom) {
        this.validFrom = validFrom;
    }

    public LocalDate getValidTo() {
        return validTo;
    }

    public void setValidTo(LocalDate validTo) {
        this.validTo = validTo;
    }

    public String getPdfUrl() {
        return pdfUrl;
    }

    public void setPdfUrl(String pdfUrl) {
        this.pdfUrl = pdfUrl;
    }

    public Set<UserEntity> getAssignedUsers() {
        return assignedUserEntities;
    }

    public void setAssignedUsers(Set<UserEntity> assignedUserEntities) {
        this.assignedUserEntities = assignedUserEntities;
    }

    public List<CommentEntity> getComments() {
        return commentEntities;
    }

    public void setComments(List<CommentEntity> commentEntities) {
        this.commentEntities = commentEntities;
    }
}