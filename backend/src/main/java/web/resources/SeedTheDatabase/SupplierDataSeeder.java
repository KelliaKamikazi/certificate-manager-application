package web.resources.SeedTheDatabase;

import data.entities.SupplierEntity;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.persistence.EntityManager;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Root;


import java.util.Arrays;
import java.util.List;


@ApplicationScoped
public class SupplierDataSeeder {

    @Inject
    EntityManager entityManager;

    public void seedData() {
        if (isSeederNeeded()) {
            seedSuppliers();
            System.out.println("Suppliers seeded.");
        }
    }

    private boolean isSeederNeeded() {
        CriteriaBuilder cb = entityManager.getCriteriaBuilder();
        CriteriaQuery<Long> query = cb.createQuery(Long.class);
        Root<SupplierEntity> root = query.from(SupplierEntity.class);
        query.select(cb.count(root));
        Long count = entityManager.createQuery(query).getSingleResult();
        return count == 0;
    }

    private void seedSuppliers() {
        List<SupplierEntity> suppliers = Arrays.asList(
                createSupplier("ANDEMIS GmbH", "Stuttgart"),
                createSupplier("IMLER AG", "Berlin")
        );
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