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
import web.dtos.UserDto;
import web.mappers.UserMapper;

import java.util.ArrayList;
import java.util.List;
import java.util.function.Function;
import java.util.stream.Collectors;

@ApplicationScoped
public class UserCriteriaSearch {

    private final EntityManager entityManager;

    @Inject
    public UserCriteriaSearch(EntityManager entityManager) {
        this.entityManager = entityManager;
    }

    public List<UserDto> searchUsers(String userId, String firstName, String lastName, String email, String department, String plant) {
        CriteriaBuilder cb = entityManager.getCriteriaBuilder();
        CriteriaQuery<UserEntity> query = cb.createQuery(UserEntity.class);
        Root<UserEntity> root = query.from(UserEntity.class);

        root.fetch(UserEntity_.department, JoinType.LEFT);
        root.fetch(UserEntity_.assignedCertificates, JoinType.LEFT);

        List<Predicate> predicates = new ArrayList<>();

        addPredicateIfNotEmpty(predicates, userId, value -> cb.equal(root.get(UserEntity_.userId), value));
        addLikePredicateIfNotEmpty(predicates, firstName, UserEntity_.firstName, cb, root);
        addLikePredicateIfNotEmpty(predicates, lastName, UserEntity_.lastName, cb, root);
        addLikePredicateIfNotEmpty(predicates, email, UserEntity_.email, cb, root);
        addDepartmentPredicateIfNotEmpty(predicates, department, cb, root);
        addPredicateIfNotEmpty(predicates, plant, value -> cb.equal(root.get(UserEntity_.plant), value));

        query.where(predicates.toArray(new Predicate[0]));

        List<UserEntity> userEntities = entityManager.createQuery(query).getResultList();
        return userEntities.stream().map(UserMapper::toDto).collect(Collectors.toList());
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

    private void addDepartmentPredicateIfNotEmpty(List<Predicate> predicates, String name, CriteriaBuilder cb, Root<UserEntity> root) {
        if (name != null && !name.isEmpty()) {
            Join<UserEntity, DepartmentEntity> departmentJoin = root.join(UserEntity_.department);
            predicates.add(cb.like(cb.lower(departmentJoin.get(DepartmentEntity_.name)), "%" + name.toLowerCase() + "%"));
        }
    }
}