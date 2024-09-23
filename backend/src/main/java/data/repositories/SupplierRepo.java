package data.repositories;

import data.entities.Supplier;
import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.transaction.Transactional;

@ApplicationScoped
@Transactional(Transactional.TxType.MANDATORY)
public class SupplierRepo implements PanacheRepository<Supplier> {
    //Additional methods
}
