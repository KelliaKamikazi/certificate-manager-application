package web.mappers;

import data.entities.UserEntity;
import jakarta.enterprise.context.ApplicationScoped;
import web.dtos.UserDto;

@ApplicationScoped
public class UserMapper {
    public UserDto toDTO(UserEntity entity) {
        UserDto dto = new UserDto();
        dto.setUserId(entity.getUserId());
        dto.setFirstName(entity.getFirstName());
        dto.setLastName(entity.getLastName());
        dto.setEmail(entity.getEmail());
        dto.setPlant(entity.getPlant());
        return dto;
    }
}