package web.dtos;

import java.time.LocalDate;
import java.util.List;
import java.util.Set;

public class CertificateDto {

    private Long id;
    private Long supplierId;
    private String certificateType;
    private LocalDate validFrom;
    private LocalDate validTo;
    private String pdfUrl;
    private Set<Long> assignedUserIds;
    private List<String> comments;

    public CertificateDto() {
    }

    public CertificateDto(Long id, Long supplierId, String certificateType, LocalDate validFrom, LocalDate validTo, String pdfUrl, Set<Long> assignedUserIds, List<String> comments) {
        this.id = id;
        this.supplierId = supplierId;
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

    public Long getSupplierId() {
        return supplierId;
    }

    public void setSupplierId(Long supplierId) {
        this.supplierId = supplierId;
    }

    public String getCertificateType() {
        return certificateType;
    }

    public void setCertificateType(String certificateType) {
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

    public Set<Long> getAssignedUserIds() {
        return assignedUserIds;
    }

    public void setAssignedUserIds(Set<Long> assignedUserIds) {
        this.assignedUserIds = assignedUserIds;
    }

    public List<String> getComments() {
        return comments;
    }

    public void setComments(List<String> comments) {
        this.comments = comments;
    }
    @Override
    public String toString() {
        return "CertificateDto{" +
                "id=" + id +
                ", supplierId=" + supplierId +
                ", certificateType='" + certificateType + '\'' +
                ", validFrom=" + validFrom +
                ", validTo=" + validTo +
                ", pdfUrl='" + pdfUrl + '\'' +
                ", assignedUserIds=" + assignedUserIds +
                ", comments=" + comments +
                '}';
    }
}
