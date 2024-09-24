package services;

import data.entities.CertificateEntity;
import data.entities.CommentEntity;
import data.entities.UserEntity;
import data.repositories.CertificateRepository;
import data.repositories.UserRepository;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.NotFoundException;
import web.dtos.CertificateDto;
import web.mappers.CertificateMapper;

import java.util.List;
import java.util.Set;
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

    public List<CertificateDto> getCertificates(){
        List<CertificateEntity> certificateEntities = certificateRepository.listAll();
        return certificateEntities.stream()
                .map(certificateMapper::toDto)
                .collect(Collectors.toList());
    }

    public CertificateDto createCertificate(CertificateDto certificateDto) {
        CertificateEntity certificateEntity = certificateMapper.toEntity(certificateDto);
        certificateRepository.persist(certificateEntity);
        return certificateMapper.toDto(certificateEntity);
    }

    public CertificateDto updateCertificateDto(Long id, CertificateDto certificateDto) {
        CertificateEntity existingCertificateEntity = certificateRepository.findById(id);

        if (existingCertificateEntity == null) {
            throw new NotFoundException("Certificate with id " + id + " not found");//for now let's use this notfound by the jakarta.ws.rs.NotFoundException;
        }

        if (certificateDto.getCertificateType() != null) {
            existingCertificateEntity.setCertificateType(certificateDto.getCertificateType());
        }
        if (certificateDto.getValidFrom() != null) {
            existingCertificateEntity.setValidFrom(certificateDto.getValidFrom());
        }
        if (certificateDto.getValidTo() != null) {
            existingCertificateEntity.setValidTo(certificateDto.getValidTo());
        }
        if (certificateDto.getPdfUrl() != null) {
            existingCertificateEntity.setPdfUrl(certificateDto.getPdfUrl());
        }
        if (certificateDto.getAssignedUserIds() != null) {
            Set<UserEntity> assignedUserEntities = certificateDto.getAssignedUserIds().stream()
                    .map(userId -> userRepository.findUserById(userId)) // Fetch user entities by ID
                    .collect(Collectors.toSet());
            existingCertificateEntity.setAssignedUsers(assignedUserEntities);
        }
        if (certificateDto.getComments() != null) {
            List<CommentEntity> commentEntities = certificateDto.getComments().stream()
                    .map(content -> {
                        CommentEntity commentEntity = new CommentEntity();
                        commentEntity.setContent(content);
                        return commentEntity;
                    }).collect(Collectors.toList());
            existingCertificateEntity.setComments(commentEntities);
        }
        return certificateMapper.toDto(existingCertificateEntity);
    }



    public void deleteCertificateDto(Long id) {
        CertificateEntity toBeDeletedCertificateEntity = certificateRepository.findById(id);
        if (toBeDeletedCertificateEntity != null) {
            certificateRepository.delete(toBeDeletedCertificateEntity);
        } else {
            throw new RuntimeException("Certificate not found");
        }
    }

}