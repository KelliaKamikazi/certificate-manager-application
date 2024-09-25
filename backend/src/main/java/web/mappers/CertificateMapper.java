package web.mappers;

import data.entities.CertificateEntity;
import data.entities.CommentEntity;
import data.entities.UserEntity;
import web.dtos.CertificateDto;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

public class CertificateMapper {


    public static CertificateDto toDto(CertificateEntity certificate){
        CertificateDto dto= new CertificateDto();
        dto.setId(certificate.getId());
        dto.setSupplierId(certificate.getSupplier().getId());
        dto.setCertificateType(certificate.getCertificateType());
        dto.setValidFrom(certificate.getValidFrom());
        dto.setValidTo(certificate.getValidTo());
        dto.setPdfUrl(certificate.getPdfUrl());
        //no duplicates allowed
        Set<Long> userIds=certificate.getAssignedUsers().stream().map(UserEntity::getId).collect(Collectors.toSet());
        dto.setAssignedUserIds(userIds);
        //duplicates can exist( it is just a list)
        List<String> commentContent=certificate.getComments().stream().map(CommentEntity::getContent).collect(Collectors.toList());
        dto.setComments(commentContent);
        return dto;
    }
}
