package services;

import data.entities.*;
import data.repositories.CertificateRepository;
import data.repositories.UserRepository;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.NotFoundException;
import web.dtos.CertificateDto;
import web.dtos.CommentDto;
import web.mappers.CertificateMapper;
import web.mappers.CommentMapper;

import java.util.*;
import java.util.function.Consumer;
import java.util.stream.Collectors;

@ApplicationScoped
@Transactional
public class CertificateService {

    @Inject
    CertificateMapper certificateMapper;
    @Inject
    CertificateRepository certificateRepository;
    @Inject
    UserRepository userRepository;
    @Inject
    CommentMapper commentMapper;

    public List<CertificateDto> getCertificates() {
        return certificateRepository.listAll().stream()
                .map(certificateMapper::toDto)
                .collect(Collectors.toList());
    }

    public CertificateDto getCertificateById(Long id) {
        CertificateEntity certificate = findCertificateById(id);
        return certificateMapper.toDto(certificate);
    }

    public CertificateDto createCertificate(CertificateDto certificateDto) {
        CertificateEntity certificateEntity = certificateMapper.toEntity(certificateDto);
        updateAssignedUsers(certificateEntity, certificateDto.getAssignedUserIds());
        certificateRepository.persist(certificateEntity);
        return certificateMapper.toDto(certificateEntity);
    }

    private <T> void updateIfNotNull(T value, Consumer<T> updater) {
        if (value != null) {
            updater.accept(value);
        }
    }

    public CertificateDto updateCertificateDto(Long id, CertificateDto certificateDto) {
        CertificateEntity existingCertificateEntity = findCertificateById(id);
        updateIfNotNull(certificateDto.getCertificateType(), existingCertificateEntity::setCertificateType);
        updateIfNotNull(certificateDto.getValidFrom(), existingCertificateEntity::setValidFrom);
        updateIfNotNull(certificateDto.getValidTo(), existingCertificateEntity::setValidTo);
        updateIfNotNull(certificateDto.getPdfUrl(), existingCertificateEntity::setPdfUrl);
        updateAssignedUsers(existingCertificateEntity, certificateDto.getAssignedUserIds());
        if (certificateDto.getComments() != null) {
            Map<Long, CommentEntity> existingComments = existingCertificateEntity.getComments().stream()
                    .collect(Collectors.toMap(CommentEntity::getId, comment -> comment));
            List<CommentEntity> updatedComments = new ArrayList<>();
            for (CommentDto commentDto : certificateDto.getComments()) {
                CommentEntity commentEntity;
                if (commentDto.getId() != null && existingComments.containsKey(commentDto.getId())) {

                    commentEntity = existingComments.get(commentDto.getId());
                    commentEntity.setContent(commentDto.getContent());
                } else {
                    commentEntity = commentMapper.toEntity(commentDto);
                    commentEntity.setCertificate(existingCertificateEntity);
                }

                UserEntity user = userRepository.findById(commentDto.getUserId());
                commentEntity.setUser(user);
                updatedComments.add(commentEntity);
            }
            existingCertificateEntity.getComments().clear();
            existingCertificateEntity.getComments().addAll(updatedComments);
        }
        certificateRepository.persist(existingCertificateEntity);
        return certificateMapper.toDto(existingCertificateEntity);
    }

    public void deleteCertificateDto(Long id) {
        CertificateEntity toBeDeletedCertificateEntity = findCertificateById(id);
        certificateRepository.delete(toBeDeletedCertificateEntity);
    }

    public List<CertificateType> getCertificateTypes() {
        return Arrays.asList(CertificateType.values());
    }


    private CertificateEntity findCertificateById(Long id) {
        return certificateRepository.findByIdOptional(id)
                .orElseThrow(() -> new NotFoundException("Certificate with id " + id + " not found"));
    }


    private void updateAssignedUsers(CertificateEntity certificateEntity, Set<Long> userIds) {
        if (userIds != null) {
            Set<UserEntity> assignedUserEntities = userIds.stream()
                    .map(userRepository::findById)
                    .filter(Objects::nonNull) // Ensure the user is found
                    .collect(Collectors.toSet());
            certificateEntity.setAssignedUsers(assignedUserEntities);
        }
    }

    public void removeAssignedUser(Long certificateId, Long userId) {
        CertificateEntity certificate = findCertificateById(certificateId);
        UserEntity user = userRepository.findByIdOptional(userId)
                .orElseThrow(() -> new NotFoundException("User with id " + userId + " not found"));

        if (certificate.getAssignedUsers().remove(user)) {
            certificateRepository.persist(certificate);
        } else {
            throw new NotFoundException("User with id " + userId + " is not assigned to certificate with id " + certificateId);
        }
    }

}
