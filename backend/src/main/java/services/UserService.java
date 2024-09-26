package services;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import web.dtos.UserDto;

import java.util.List;

@ApplicationScoped
public class UserService {
    @Inject
    private UserCriteriaSearch userCriteriaSearch;

    public List<UserDto> searchUsers(String userId, String firstName, String lastName, String email, String department, String plant) {
        return userCriteriaSearch.searchUsers(userId, firstName, lastName, email, department, plant);
    }
}