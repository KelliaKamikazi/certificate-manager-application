package services;
import data.entities.UserEntity;
import data.entities.UserEntity_;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.persistence.EntityManager;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;

import java.util.ArrayList;
import java.util.List;

@ApplicationScoped
public class UserCriteriaSearch {

    private final EntityManager entityManager;

    @Inject
    public UserCriteriaSearch(EntityManager entityManager) {
        this.entityManager = entityManager;
    }

    public List<UserEntity> searchUsers(String userId, String firstName, String lastName, String email, String plant) {

        CriteriaBuilder cb = entityManager.getCriteriaBuilder();
        CriteriaQuery<UserEntity> query = cb.createQuery(UserEntity.class);
        Root<UserEntity> root = query.from(UserEntity.class);
        List<Predicate> predicates = new ArrayList<>();

        if (userId != null && !userId.isEmpty()) {
            predicates.add(cb.equal(root.get(UserEntity_.userId), userId));
        }
        if (firstName != null && !firstName.isEmpty()) {
            predicates.add(cb.like(cb.lower(root.get(UserEntity_.firstName)), "%" + firstName.toLowerCase() + "%"));
        }
        if (lastName != null && !lastName.isEmpty()) {
            predicates.add(cb.like(cb.lower(root.get(UserEntity_.lastName)), "%" + lastName.toLowerCase() + "%"));
        }
        if (email != null && !email.isEmpty()) {
            predicates.add(cb.like(cb.lower(root.get(UserEntity_.email)), "%" + email.toLowerCase() + "%"));
        }
        if (plant != null && !plant.isEmpty()) {
            predicates.add(cb.equal(root.get(UserEntity_.plant), plant));
        }
        query.where(predicates.toArray(new Predicate[0]));

        return entityManager.createQuery(query).getResultList();
    }
}
