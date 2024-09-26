package web.mappers;

import data.entities.CommentEntity;
import jakarta.enterprise.context.ApplicationScoped;
import web.dtos.CommentDto;

@ApplicationScoped
public class CommentMapper {

    public CommentDto toDto(CommentEntity entity) {
        if (entity == null) return null;
        CommentDto dto = new CommentDto();
        dto.setId(entity.getId());
        dto.setCertificateId(entity.getCertificate().getId());
        dto.setUserId(entity.getUser().getId());
        dto.setContent(entity.getContent());
        return dto;
    }

    public CommentEntity toEntity(CommentDto dto) {
        if (dto == null) return null;
        CommentEntity entity = new CommentEntity();
        entity.setId(dto.getId());
        entity.setContent(dto.getContent());
        return entity;
    }
}
