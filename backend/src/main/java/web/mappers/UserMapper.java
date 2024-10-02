package web.mappers;

import data.entities.CertificateEntity;
import data.entities.CommentEntity;
import data.entities.UserEntity;
import jakarta.enterprise.context.ApplicationScoped;
import web.dtos.UserDto;

import java.util.stream.Collectors;

@ApplicationScoped
public class UserMapper {
    public static UserDto toDto(UserEntity entity) {
        return new UserDto(
                entity.getId(),
                entity.getUserIndex(),
                entity.getFirstName(),
                entity.getLastName(),
                entity.getEmail(),
                entity.getDepartment() != null ? entity.getDepartment().getId() : null,
                entity.getPlant(),
                entity.getAssignedCertificates().stream().map(CertificateEntity::getId).collect(Collectors.toSet()),
                entity.getComments().stream().map(CommentEntity::getId).collect(Collectors.toList())
        );
    }
}