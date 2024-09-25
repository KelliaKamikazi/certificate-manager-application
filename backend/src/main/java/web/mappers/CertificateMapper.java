package web.mappers;

import data.entities.*;
import data.repositories.SupplierRepository;
import data.repositories.UserRepository;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.ws.rs.NotFoundException;
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
        if (certificateEntity == null) {
            return null;
        }

        CertificateDto dto = new CertificateDto();
        dto.setId(certificateEntity.getId());
        dto.setSupplierId(certificateEntity.getSupplier() != null ? certificateEntity.getSupplier().getId() : null);
        dto.setCertificateType(certificateEntity.getCertificateType());
        dto.setValidFrom(certificateEntity.getValidFrom());
        dto.setValidTo(certificateEntity.getValidTo());
        dto.setPdfUrl(certificateEntity.getPdfUrl());

        Set<Long> userIds = certificateEntity.getAssignedUsers().stream()
                .map(UserEntity::getId)
                .collect(Collectors.toSet());
        dto.setAssignedUserIds(userIds);

        List<String> commentContent = certificateEntity.getComments().stream()
                .map(CommentEntity::getContent)
                .collect(Collectors.toList());
        dto.setComments(commentContent);

        return dto;
    }

    public CertificateEntity toEntity(CertificateDto certificateDto) {
        if (certificateDto == null) {
            return null;
        }

        CertificateEntity entity = new CertificateEntity();
        entity.setId(certificateDto.getId());
        entity.setCertificateType(certificateDto.getCertificateType());
        entity.setPdfUrl(certificateDto.getPdfUrl());
        entity.setValidFrom(certificateDto.getValidFrom());
        entity.setValidTo(certificateDto.getValidTo());

        if (certificateDto.getSupplierId() != null) {
            SupplierEntity supplierEntity = supplierRepository.findById(certificateDto.getSupplierId());
            if (supplierEntity == null) {
                throw new NotFoundException("Supplier not found with id: " + certificateDto.getSupplierId());
            }
            entity.setSupplier(supplierEntity);
        }

        if (certificateDto.getComments() != null) {
            List<CommentEntity> commentEntities = certificateDto.getComments().stream()
                    .map(content -> {
                        CommentEntity commentEntity = new CommentEntity();
                        commentEntity.setContent(content);
                        return commentEntity;
                    })
                    .collect(Collectors.toList());
            entity.setComments(commentEntities);
        }

        if (certificateDto.getAssignedUserIds() != null) {
            Set<UserEntity> assignedUserEntities = certificateDto.getAssignedUserIds().stream()
                    .map(userId -> userRepository.findById(userId))
                    .filter(userEntity -> userEntity != null)
                    .collect(Collectors.toSet());
            entity.setAssignedUsers(assignedUserEntities);
        }

        return entity;
    }
}