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
    @JoinColumn(name = "supplier_id", nullable = false)
    private SupplierEntity supplier;
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
    private Set<UserEntity> assignedUsers = new HashSet<>();

    @OneToMany(mappedBy = "certificate", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<CommentEntity> comments = new ArrayList<>();

    public CertificateEntity() {}

    public CertificateEntity(Long id, SupplierEntity supplier, CertificateType certificateType, LocalDate validFrom, LocalDate validTo, String pdfUrl, Set<UserEntity> assignedUsers, List<CommentEntity> comments) {
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