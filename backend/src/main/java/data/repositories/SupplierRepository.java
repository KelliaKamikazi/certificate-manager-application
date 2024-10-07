package data.repositories;

import data.entities.SupplierEntity;
import data.entities.SupplierEntity_;
import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Root;
import jakarta.transaction.Transactional;
import java.util.List;

@ApplicationScoped
@Transactional(Transactional.TxType.MANDATORY)
public class SupplierRepository implements PanacheRepository<SupplierEntity> {

  public List<SupplierEntity> findByName(String name) {
    CriteriaBuilder cb = getEntityManager().getCriteriaBuilder();
    CriteriaQuery<SupplierEntity> cq = cb.createQuery(SupplierEntity.class);
    Root<SupplierEntity> root = cq.from(SupplierEntity.class);
    cq.where(cb.like(cb.lower(root.get(SupplierEntity_.name)), "%" + name.toLowerCase() + "%"));
    return getEntityManager().createQuery(cq).getResultList();
  }

  public List<SupplierEntity> findByCity(String city) {
    CriteriaBuilder cb = getEntityManager().getCriteriaBuilder();
    CriteriaQuery<SupplierEntity> cq = cb.createQuery(SupplierEntity.class);
    Root<SupplierEntity> root = cq.from(SupplierEntity.class);
    cq.where(cb.like(cb.lower(root.get(SupplierEntity_.city)), "%" + city.toLowerCase() + "%"));
    return getEntityManager().createQuery(cq).getResultList();
  }
}
