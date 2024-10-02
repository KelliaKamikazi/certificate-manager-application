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

import java.util.Arrays;
import java.util.List;
import java.util.Set;
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

        if (certificateDto.getComments() != null && !certificateDto.getComments().isEmpty()) {
            List<CommentEntity> newComments = certificateDto.getComments().stream()
                    .map(commentDto -> {
                        CommentEntity commentEntity = commentMapper.toEntity(commentDto);
                        UserEntity user = userRepository.findById(commentDto.getUserId());
                        commentEntity.setUser(user);
                        commentEntity.setCertificate(existingCertificateEntity);
                        return commentEntity;
                    })
                    .collect(Collectors.toList());
            existingCertificateEntity.getComments().addAll(newComments);
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
                    .filter(user -> user != null)
                    .collect(Collectors.toSet());
            certificateEntity.setAssignedUsers(assignedUserEntities);
        }
    }
    
    }

}