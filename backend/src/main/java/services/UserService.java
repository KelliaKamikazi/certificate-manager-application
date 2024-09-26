package services;

import data.entities.UserEntity;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import web.dtos.UserDto;
import web.mappers.UserMapper;

import java.util.List;
import java.util.stream.Collectors;

@ApplicationScoped
public class UserService {
    @Inject
    private UserCriteriaSearch userCriteriaSearch;

    @Inject
    private UserMapper userMapper;

    public List<UserDto> searchUsers(String userId, String firstName,String lastName, String email, String department,String plant) {
        List<UserEntity> entities = userCriteriaSearch.searchUsers(userId, firstName,lastName, email,department, plant);
        return entities.stream().map(userMapper::toDTO).collect(Collectors.toList());
    }
}