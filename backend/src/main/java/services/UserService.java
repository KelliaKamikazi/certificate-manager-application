package services;

import data.entities.UserEntity;
import data.repositories.UserRepository;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import web.dtos.UserDto;
import web.mappers.UserMapper;

import java.util.List;
import java.util.stream.Collectors;

@ApplicationScoped
@Transactional
public class UserService {

    @Inject
    UserRepository userRepository;

    @Inject
    private UserCriteriaSearch userCriteriaSearch;

    public List<UserDto> searchUsers(String userId, String firstName, String lastName, String email, String department, String plant) {
        return userCriteriaSearch.searchUsers(userId, firstName, lastName, email, department, plant);
    }

    public List<UserDto> getAllUsers() {
        List<UserEntity> users = userRepository.listAll();
        return users.stream().map(UserMapper::toDto).collect(Collectors.toList());
    }
}