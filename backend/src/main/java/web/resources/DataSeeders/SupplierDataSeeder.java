package web.resources.DataSeeders;

import data.entities.SupplierEntity;
import io.quarkus.runtime.StartupEvent;
import jakarta.enterprise.event.Observes;
import jakarta.inject.Singleton;
import jakarta.persistence.EntityManager;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Root;
import jakarta.transaction.Transactional;

import java.util.Arrays;
import java.util.List;

@Singleton
public class SupplierDataSeeder {

    private final EntityManager entityManager;

    public SupplierDataSeeder(EntityManager entityManager) {
        this.entityManager = entityManager;
    }
    @Transactional
    void onStart(@Observes StartupEvent ev){
        //check if the entity already exist before
        CriteriaBuilder cb = entityManager.getCriteriaBuilder();
        CriteriaQuery<Long> query=cb.createQuery(Long.class);
        Root<SupplierEntity> root= query.from(SupplierEntity.class);
        query.select(cb.count(root));

        Long count=entityManager.createQuery(query).getSingleResult();
        if (count==0){
            seedSuppliers();
            System.out.println("Suppliers seeded.");
        }

    }

    private void seedSuppliers(){
        List<SupplierEntity> suppliers= Arrays.asList(createSupplier("ANDEMIS GmbH","Stuttgart"),
        createSupplier("IMLER AG","Berlin"));

        for (SupplierEntity supplier : suppliers) {
            entityManager.persist(supplier);
        }
    }

    private SupplierEntity createSupplier(String name, String city) {
        SupplierEntity supplier = new SupplierEntity();
        supplier.setName(name);
        supplier.setCity(city);
        return supplier;
    }

}
