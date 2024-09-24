package web.resources.SeedTheDatabase;

import data.entities.UserEntity;
import data.repositories.DepartmentRepository;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.persistence.EntityManager;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Root;
import jakarta.inject.Inject;
import java.util.Arrays;
import java.util.List;

@ApplicationScoped
public class UserDataSeeder {

    @Inject
    EntityManager entityManager;

    @Inject
    DepartmentRepository departmentRepository;

    public void seedData() {
        if (isSeederNeeded()) {
            seedUsers();
            System.out.println("Users seeded.");
        }
    }

    private boolean isSeederNeeded() {
        CriteriaBuilder cb = entityManager.getCriteriaBuilder();
        CriteriaQuery<Long> query = cb.createQuery(Long.class);
        Root<UserEntity> root = query.from(UserEntity.class);
        query.select(cb.count(root));
        Long count = entityManager.createQuery(query).getSingleResult();
        return count == 0;
    }

    private void seedUsers() {
        List<UserEntity> users = Arrays.asList(
                createUser("simonz@mail.com", "Simon", "Zwolfer", "096", "ZWOELF", 1L),
                createUser("wolfgangs@mail.com", "Wolfgang", "Stark", "094", "WOLFST", 2L)
        );
        for (UserEntity user : users) {
            entityManager.persist(user);
        }
    }

    private UserEntity createUser(String email, String firstName, String lastName, String plant, String userId, Long departmentId) {
        UserEntity user = new UserEntity();
        user.setEmail(email);
        user.setFirstName(firstName);
        user.setLastName(lastName);
        user.setPlant(plant);
        user.setUserId(userId);
        user.setDepartment(departmentRepository.findById(departmentId));
        return user;
    }
}