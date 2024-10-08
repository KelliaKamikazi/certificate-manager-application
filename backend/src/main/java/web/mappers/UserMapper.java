package web.mappers;

import data.entities.CertificateEntity;
import data.entities.CommentEntity;
import data.entities.DepartmentEntity;
import data.entities.UserEntity;
import jakarta.enterprise.context.ApplicationScoped;
import java.util.stream.Collectors;
import web.dtos.DepartmentDto;
import web.dtos.UserDto;

@ApplicationScoped
public class UserMapper {
  public static UserDto toDto(UserEntity entity) {
    return new UserDto(
        entity.getId(),
        entity.getUserIndex(),
        entity.getFirstName(),
        entity.getLastName(),
        entity.getEmail(),
        toDepartmentDto(entity.getDepartment()),
        entity.getPlant(),
        entity.getAssignedCertificates().stream()
            .map(CertificateEntity::getId)
            .collect(Collectors.toSet()),
        entity.getComments().stream().map(CommentEntity::getId).collect(Collectors.toList()));
  }

  private static DepartmentDto toDepartmentDto(DepartmentEntity departmentEntity) {
    if (departmentEntity == null) {
      return null;
    }
    return new DepartmentDto(departmentEntity.getId(), departmentEntity.getName());
  }
}
