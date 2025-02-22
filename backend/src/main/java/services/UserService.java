package services;

import data.entities.UserEntity;
import data.repositories.UserRepository;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import java.util.List;
import java.util.stream.Collectors;
import web.dtos.UserDto;
import web.mappers.UserMapper;

@ApplicationScoped
@Transactional
public class UserService {

  @Inject UserRepository userRepository;

  @Inject private UserCriteriaSearch userCriteriaSearch;

  public List<UserDto> searchUsers(
      String userIndex,
      String firstName,
      String lastName,
      String email,
      String department,
      String plant) {
    return userCriteriaSearch.searchUsers(userIndex, firstName, lastName, email, department, plant);
  }

  public List<UserDto> getAllUsers() {
    List<UserEntity> users = userRepository.listAll();
    return users.stream().map(UserMapper::toDto).collect(Collectors.toList());
  }

  public List<UserDto> getUsersByIds(List<Long> userIds) {
    return userIds.stream()
        .map(userRepository::findById)
        .filter(user -> user != null)
        .map(UserMapper::toDto)
        .collect(Collectors.toList());
  }

  public UserDto getUserById(Long id) {
    UserEntity user = userRepository.findById(id);
    return user != null ? UserMapper.toDto(user) : null;
  }
}
