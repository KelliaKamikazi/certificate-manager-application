package web.mappers;

import data.entities.CertificateEntity;
import data.entities.CommentEntity;
import data.entities.UserEntity;
import jakarta.enterprise.context.ApplicationScoped;
import web.dtos.CommentDto;

@ApplicationScoped
public class CommentMapper {

    public CommentDto toDto(CommentEntity entity) {
        CommentDto dto = new CommentDto();
        dto.setId(entity.getId());
        dto.setCertificateId(entity.getCertificate().getId());
        dto.setUserId(entity.getUser().getId());
        dto.setContent(entity.getContent());
        return dto;
    }

    public CommentEntity toEntity(CommentDto dto) {
        CommentEntity entity = new CommentEntity();
        entity.setId(dto.getId());

        CertificateEntity certificate = new CertificateEntity();
        certificate.setId(dto.getCertificateId());
        entity.setCertificate(certificate);

        UserEntity user = new UserEntity();
        user.setId(dto.getUserId());
        entity.setUser(user);

        entity.setContent(dto.getContent());
        return entity;
    }
}
