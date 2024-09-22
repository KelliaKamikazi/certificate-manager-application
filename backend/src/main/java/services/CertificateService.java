package services;

import data.entities.Certificate;
import data.entities.Comment;
import data.entities.Certificate_Type;
import data.entities.User;
import data.repositories.CertificateRepo;
import data.repositories.UserRepo;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
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
    CertificateRepo certificateRepo;
    @Inject
    UserRepo userRepo;

    public List<CertificateDto> getCertificates(){
        List<Certificate> certificates = certificateRepo.listAll();
        return certificates.stream()
                .map(certificateMapper::toDto)
                .collect(Collectors.toList());
    }

    public CertificateDto createCertificate(CertificateDto certificateDto) {
        Certificate certificate = certificateMapper.toEntity(certificateDto);
        certificateRepo.persist(certificate);
        return certificateMapper.toDto(certificate);
    }

    public CertificateDto updateCertificateDto(Long id, CertificateDto certificateDto) {
        Certificate existingCertificate = certificateRepo.findById(id);

        if (existingCertificate != null) {
            if (certificateDto.getCertificateType() != null) {
                existingCertificate.setCertificateType(Certificate_Type.valueOf(certificateDto.getCertificateType()));
            }
            if (certificateDto.getValidFrom() != null) {
                existingCertificate.setValidFrom(certificateDto.getValidFrom());
            }
            if (certificateDto.getValidTo() != null) {
                existingCertificate.setValidTo(certificateDto.getValidTo());
            }
            if (certificateDto.getPdfUrl() != null) {
                existingCertificate.setPdfUrl(certificateDto.getPdfUrl());
            }
            if (certificateDto.getAssignedUserIds() != null) {
                Set<User> assignedUsers = certificateDto.getAssignedUserIds().stream()
                        .map(userId -> userRepo.findUserById(userId))
                        .collect(Collectors.toSet());
                existingCertificate.setAssignedUsers(assignedUsers);
            }
            if (certificateDto.getComments() != null) {
                List<Comment> comments = certificateDto.getComments().stream()
                        .map(content -> {
                            Comment comment = new Comment();
                            comment.setContent(content);
                            return comment;
                        }).collect(Collectors.toList());
                existingCertificate.setComments(comments);
            }
            return certificateMapper.toDto(existingCertificate);
        }

        throw new RuntimeException("Certificate Not found");
    }


    public CertificateDto deleteCertificateDto(Long id, CertificateDto certificateDto){
        Certificate toBeDeletedCertificate =  certificateRepo.findById(id);

        if(toBeDeletedCertificate!=null){
            certificateRepo.delete(toBeDeletedCertificate);
        }
        else{
            throw new RuntimeException("Certificate deleted");
        }
        return null;
    }








}
