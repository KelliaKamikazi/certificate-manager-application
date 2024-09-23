package web.resources.DataSeeders;

import data.entities.UserEntity;
import data.repositories.DepartmentRepository;
import jakarta.inject.Singleton;
import jakarta.persistence.EntityManager;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Root;
import jakarta.transaction.Transactional;
import jakarta.inject.Inject;
import java.util.Arrays;
import java.util.List;

@Singleton
public class UserDataSeeder {

    private final EntityManager entityManager;
    private final DepartmentRepository departmentRepository;

    @Inject
    public UserDataSeeder(EntityManager entityManager, DepartmentRepository departmentRepository) {
        this.entityManager = entityManager;
        this.departmentRepository = departmentRepository;
    }

    @Transactional
    public void seedIfNeeded() {
        CriteriaBuilder cb = entityManager.getCriteriaBuilder();
        CriteriaQuery<Long> query = cb.createQuery(Long.class);
        Root<UserEntity> root = query.from(UserEntity.class);
        query.select(cb.count(root));

        Long count = entityManager.createQuery(query).getSingleResult();

        if (count == 0) {
            seedUsers();
            System.out.println("Users seeded.");
        }
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
