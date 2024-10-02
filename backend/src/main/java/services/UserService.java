package services;

import data.entities.UserEntity;
import data.repositories.UserRepository;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.NotFoundException;
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

    public List<UserDto> searchUsers(String userIndex, String firstName, String lastName, String email, String department, String plant) {
        return userCriteriaSearch.searchUsers(userIndex, firstName, lastName, email, department, plant);
    }

    public List<UserDto> getAllUsers() {
        List<UserEntity> users = userRepository.listAll();
        return users.stream().map(UserMapper::toDto).collect(Collectors.toList());
    }

    public UserDto getUserById(Long id) {
        UserEntity user = userRepository.findById(id);
        if (user == null) {
            throw new NotFoundException("User with id " + id + " not found");
        }
        return UserMapper.toDto(user);
    }

    public List<UserDto> getUsersByIds(List<Long> ids) {
        return ids.stream()
                .map(this::getUserById)
                .collect(Collectors.toList());
    }

}