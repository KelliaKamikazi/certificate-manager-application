package data.repositories;

import data.entities.SupplierEntity;
import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Root;
import jakarta.transaction.Transactional;

@ApplicationScoped
@Transactional(Transactional.TxType.MANDATORY)
public class SupplierRepository implements PanacheRepository<SupplierEntity> {
    //Additional methods
    public SupplierEntity findByName(String name) {
        CriteriaBuilder cb = getEntityManager().getCriteriaBuilder();
        CriteriaQuery<SupplierEntity> cq = cb.createQuery(SupplierEntity.class);
        Root<SupplierEntity> root = cq.from(SupplierEntity.class);
        cq.where(cb.equal(root.get("name"), name));
        return getEntityManager().createQuery(cq).getSingleResult();
    }
}
