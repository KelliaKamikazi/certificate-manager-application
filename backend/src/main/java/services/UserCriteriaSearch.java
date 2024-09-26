package services;

import data.entities.DepartmentEntity;
import data.entities.DepartmentEntity_;
import data.entities.UserEntity;
import data.entities.UserEntity_;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.persistence.EntityManager;
import jakarta.persistence.criteria.*;
import jakarta.persistence.metamodel.SingularAttribute;

import java.util.ArrayList;
import java.util.List;
import java.util.function.Function;

@ApplicationScoped
public class UserCriteriaSearch {

    private final EntityManager entityManager;

    @Inject
    public UserCriteriaSearch(EntityManager entityManager) {
        this.entityManager = entityManager;
    }

    public List<UserEntity> searchUsers(String userId, String firstName, String lastName, String email,String department, String plant) {
        CriteriaBuilder cb = entityManager.getCriteriaBuilder();
        CriteriaQuery<UserEntity> query = cb.createQuery(UserEntity.class);
        Root<UserEntity> root = query.from(UserEntity.class);
        List<Predicate> predicates = new ArrayList<>();

        addPredicateIfNotEmpty(predicates, userId, value -> cb.equal(root.get(UserEntity_.userId), value));
        addLikePredicateIfNotEmpty(predicates, firstName, UserEntity_.firstName, cb, root);
        addLikePredicateIfNotEmpty(predicates, lastName, UserEntity_.lastName, cb, root);
        addLikePredicateIfNotEmpty(predicates, email, UserEntity_.email, cb, root);
        addDepartmentPredicateIfNotEmpty(predicates, department, cb, root);
        addPredicateIfNotEmpty(predicates, plant, value -> cb.equal(root.get(UserEntity_.plant), value));

        query.where(predicates.toArray(new Predicate[0]));

        return entityManager.createQuery(query).getResultList();
    }

    private void addPredicateIfNotEmpty(List<Predicate> predicates, String value, Function<String, Predicate> predicateFunction) {
        if (value != null && !value.isEmpty()) {
            predicates.add(predicateFunction.apply(value));
        }
    }

    private void addLikePredicateIfNotEmpty(List<Predicate> predicates, String value, SingularAttribute<UserEntity, String> attribute, CriteriaBuilder cb, Root<UserEntity> root) {
        addPredicateIfNotEmpty(predicates, value,
                v -> cb.like(cb.lower(root.get(attribute)), "%" + v.toLowerCase() + "%"));
    }
    private void addDepartmentPredicateIfNotEmpty(List<Predicate> predicates, String departmentName, CriteriaBuilder cb, Root<UserEntity> root) {
        if (departmentName != null && !departmentName.isEmpty()) {
            Join<UserEntity, DepartmentEntity> departmentJoin = root.join(UserEntity_.department);
            predicates.add(cb.like(cb.lower(departmentJoin.get(DepartmentEntity_.name)), "%" + departmentName.toLowerCase() + "%"));
        }
    }

}