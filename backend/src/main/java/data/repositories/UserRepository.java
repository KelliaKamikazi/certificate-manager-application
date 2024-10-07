package data.repositories;

import data.entities.UserEntity;
import data.entities.UserEntity_;
import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.persistence.EntityManager;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Root;
import jakarta.transaction.Transactional;
import java.util.List;
import java.util.Set;

@ApplicationScoped
@Transactional(Transactional.TxType.MANDATORY)
public class UserRepository implements PanacheRepository<UserEntity> {
  @Inject EntityManager em;

  public List<UserEntity> findAllById(Set<Long> ids) {
    CriteriaBuilder cb = em.getCriteriaBuilder();
    CriteriaQuery<UserEntity> cq = cb.createQuery(UserEntity.class);
    Root<UserEntity> root = cq.from(UserEntity.class);
    cq.select(root).where(root.get(UserEntity_.id).in(ids));
    return em.createQuery(cq).getResultList();
  }
}
