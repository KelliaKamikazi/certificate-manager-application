package web.mappers;

import data.entities.*;
import data.repositories.SupplierRepository;
import data.repositories.UserRepository;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.ws.rs.NotFoundException;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;
import web.dtos.CertificateDto;
import web.dtos.CommentDto;

@ApplicationScoped
public class CertificateMapper {
  @Inject SupplierRepository supplierRepository;

  @Inject UserRepository userRepository;

  @Inject SupplierMapper supplierMapper;
  @Inject CommentMapper commentMapper;

  public CertificateDto toDto(CertificateEntity certificateEntity) {
    if (certificateEntity == null) {
      return null;
    }

    CertificateDto dto = new CertificateDto();
    dto.setId(certificateEntity.getId());
    dto.setSupplier(supplierMapper.toDTO(certificateEntity.getSupplier()));
    dto.setCertificateType(certificateEntity.getCertificateType());
    dto.setValidFrom(certificateEntity.getValidFrom());
    dto.setValidTo(certificateEntity.getValidTo());
    dto.setPdfUrl(certificateEntity.getPdfUrl());

    Set<Long> userIds =
        certificateEntity.getAssignedUsers().stream()
            .map(UserEntity::getId)
            .collect(Collectors.toSet());
    dto.setAssignedUserIds(userIds);

    List<CommentDto> comments =
        certificateEntity.getComments().stream()
            .map(commentMapper::toDto)
            .collect(Collectors.toList());
    dto.setComments(comments);

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

    if (certificateDto.getSupplier() != null) {
      SupplierEntity supplierEntity =
          supplierRepository.findById(certificateDto.getSupplier().getId());
      if (supplierEntity == null) {
        throw new NotFoundException(
            "Supplier not found with id: " + certificateDto.getSupplier().getId());
      }
      entity.setSupplier(supplierEntity);
    }

    if (certificateDto.getComments() != null) {
      List<CommentEntity> commentEntities =
          certificateDto.getComments().stream()
              .map(commentMapper::toEntity)
              .collect(Collectors.toList());
      entity.setComments(commentEntities);
    }

    if (certificateDto.getAssignedUserIds() != null) {
      Set<UserEntity> assignedUserEntities =
          certificateDto.getAssignedUserIds().stream()
              .map(userId -> userRepository.findById(userId))
              .filter(userEntity -> userEntity != null)
              .collect(Collectors.toSet());
      entity.setAssignedUsers(assignedUserEntities);
    }

    if (certificateDto.getAssignedUserIds() != null
        && !certificateDto.getAssignedUserIds().isEmpty()) {
      List<UserEntity> assignedUserEntities =
          userRepository.findAllById(certificateDto.getAssignedUserIds());
      entity.setAssignedUsers(new HashSet<>(assignedUserEntities));
    }

    return entity;
  }
}
