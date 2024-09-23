package web.mappers;

import data.entities.*;
import data.repositories.SupplierRepository;
import data.repositories.UserRepository;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import web.dtos.CertificateDto;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;


@ApplicationScoped
public class CertificateMapper {

    @Inject
    SupplierRepository supplierRepository;

    @Inject
    UserRepository userRepository;

    public CertificateDto toDto(CertificateEntity certificateEntity) {
        CertificateDto dto = new CertificateDto();
        dto.setId(certificateEntity.getId());
        dto.setSupplierId(certificateEntity.getSupplier().getId());
        dto.setCertificateType(certificateEntity.getCertificateType());
        dto.setValidFrom(certificateEntity.getValidFrom());
        dto.setValidTo(certificateEntity.getValidTo());
        dto.setPdfUrl(certificateEntity.getPdfUrl());

        Set<Long> userIds = certificateEntity.getAssignedUsers()
                .stream()
                .map(UserEntity::getId)
                .collect(Collectors.toSet());
        dto.setAssignedUserIds(userIds);

        List<String> commentContent = certificateEntity.getComments()
                .stream()
                .map(CommentEntity::getContent)
                .collect(Collectors.toList());
        dto.setComments(commentContent);
        return dto;
    }

    public CertificateEntity toEntity(CertificateDto certificateDto) {
        CertificateEntity entity = new CertificateEntity();
        entity.setId(certificateDto.getId());

        SupplierEntity supplierEntity = supplierRepository.findById(certificateDto.getId());
        if (supplierEntity != null) {
            entity.setSupplier(supplierEntity);
        } else {
            throw new RuntimeException("Supplier not found");
        }
        entity.setCertificateType(certificateDto.getCertificateType());
        entity.setPdfUrl(certificateDto.getPdfUrl());
        entity.setValidFrom(certificateDto.getValidFrom());
        entity.setValidTo(certificateDto.getValidTo());

        List<CommentEntity> commentEntities = certificateDto.getComments()
                .stream()
                .map(content -> {
                    CommentEntity commentEntity = new CommentEntity();
                    commentEntity.setContent(content);
                    return commentEntity;
                })
                .collect(Collectors.toList());
        entity.setComments(commentEntities);

        Set<UserEntity> assignedUserEntities = certificateDto.getAssignedUserIds()
                .stream()
                .map(userId -> {
                    UserEntity userEntity = userRepository.findUserById(userId);
                    if (userEntity == null) {
                        throw new RuntimeException("User not found for ID");
                    }
                    return userEntity;
                })
                .collect(Collectors.toSet());
        entity.setAssignedUsers(assignedUserEntities);

        return entity;
    }
}
