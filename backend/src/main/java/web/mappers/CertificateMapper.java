package web.mappers;

import data.entities.*;
import data.repositories.SupplierRepo;
import data.repositories.UserRepo;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import web.dtos.CertificateDto;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;


@ApplicationScoped
public class CertificateMapper {

    @Inject
    SupplierRepo supplierRepo;

    @Inject
    UserRepo userRepo;

    public CertificateDto toDto(Certificate certificate) {
        CertificateDto dto = new CertificateDto();
        dto.setId(certificate.getId());
        dto.setSupplierId(certificate.getSupplier().getId());
        dto.setCertificateType(certificate.getCertificateType().getDisplayName());
        dto.setValidFrom(certificate.getValidFrom());
        dto.setValidTo(certificate.getValidTo());
        dto.setPdfUrl(certificate.getPdfUrl());

        // No duplicates allowed for assigned users
        Set<Long> userIds = certificate.getAssignedUsers()
                .stream()
                .map(User::getId)
                .collect(Collectors.toSet());
        dto.setAssignedUserIds(userIds);

        // Comments can have duplicates (just a list)
        List<String> commentContent = certificate.getComments()
                .stream()
                .map(Comment::getContent)
                .collect(Collectors.toList());
        dto.setComments(commentContent);
        return dto;
    }

    public Certificate toEntity(CertificateDto certificateDto) {
        Certificate entity = new Certificate();
        entity.setId(certificateDto.getId());

        Supplier supplier = supplierRepo.findById(certificateDto.getId());
        if (supplier != null) {
            entity.setSupplier(supplier);
        } else {
            throw new RuntimeException("Supplier not found");
        }

        entity.setCertificateType(Certificate_Type.valueOf(certificateDto.getCertificateType()));
        entity.setPdfUrl(certificateDto.getPdfUrl());
        entity.setValidFrom(certificateDto.getValidFrom());
        entity.setValidTo(certificateDto.getValidTo());

        // Map comments to entity
        List<Comment> comments = certificateDto.getComments()
                .stream()
                .map(content -> {
                    Comment comment = new Comment();
                    comment.setContent(content);
                    return comment;
                })
                .collect(Collectors.toList());
        entity.setComments(comments);

        // Map assigned users to entity
        Set<User> assignedUsers = certificateDto.getAssignedUserIds()
                .stream()
                .map(userId -> {
                    User user = userRepo.findUserById(userId);
                    if (user == null) {
                        throw new RuntimeException("User not found for ID");
                    }
                    return user;
                })
                .collect(Collectors.toSet());
        entity.setAssignedUsers(assignedUsers);

        return entity;
    }
}
