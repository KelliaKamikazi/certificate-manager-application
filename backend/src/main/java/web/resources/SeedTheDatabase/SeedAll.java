package web.resources.SeedTheDatabase;

import io.quarkus.runtime.StartupEvent;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.enterprise.event.Observes;
import jakarta.inject.Inject;
import jakarta.inject.Singleton;
import jakarta.transaction.Transactional;

@ApplicationScoped
public class SeedAll {

    @Inject
    SupplierDataSeeder supplierDataSeeder;

    @Inject
    DepartmentDataSeeder departmentDataSeeder;

    @Inject
    UserDataSeeder userDataSeeder;

    @Transactional
    void onStart(@Observes StartupEvent ev) {
        supplierDataSeeder.seedData();
        departmentDataSeeder.seedData();
        userDataSeeder.seedData();
        System.out.println("All seeding operations completed.");
    }
}