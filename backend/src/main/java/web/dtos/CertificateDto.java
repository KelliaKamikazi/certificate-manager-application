package web.dtos;

import com.fasterxml.jackson.annotation.JsonProperty;
import data.entities.CertificateType;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;

public class CertificateDto {

    private Long id;
    private SupplierDto supplier;
    private CertificateType certificateType;
    private LocalDateTime validFrom;
    private LocalDateTime validTo;
    private String pdfUrl;
    private Set<Long> assignedUserIds;
    private List<CommentDto> comments;

    public CertificateDto() {
    }

    public CertificateDto(Long id, SupplierDto supplier, CertificateType certificateType, LocalDateTime validFrom, LocalDateTime validTo, String pdfUrl, Set<Long> assignedUserIds, List<CommentDto> comments) {
        this.id = id;
        this.supplier = supplier;
        this.certificateType = certificateType;
        this.validFrom = validFrom;
        this.validTo = validTo;
        this.pdfUrl = pdfUrl;
        this.assignedUserIds = assignedUserIds;
        this.comments = comments;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public SupplierDto getSupplier() {
        return supplier;
    }

    public void setSupplier(SupplierDto supplier) {
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

    public Set<Long> getAssignedUserIds() {
        return assignedUserIds;
    }

    public void setAssignedUserIds(Set<Long> assignedUserIds) {
        this.assignedUserIds = assignedUserIds;
    }

    public List<CommentDto> getComments() {
        return comments;
    }

    public void setComments(List<CommentDto> comments) {
        this.comments = comments;
    }

    @Override
    public String toString() {
        return "CertificateDto{" +
                "id=" + id +
                ", supplier=" + supplier +
                ", certificateType=" + certificateType.getDisplayName() +
                ", validFrom=" + validFrom +
                ", validTo=" + validTo +
                ", pdfUrl='" + pdfUrl + '\'' +
                ", assignedUserIds=" + assignedUserIds +
                ", comments=" + comments +
                '}';
    }
}