package web.resources.DataSeeders;

import io.quarkus.runtime.StartupEvent;
import jakarta.enterprise.event.Observes;
import jakarta.inject.Inject;
import jakarta.inject.Singleton;
import jakarta.transaction.Transactional;

@Singleton
public class SeedAll {

    private final DepartmentDataSeeder departmentDataSeeder;
    private final UserDataSeeder userDataSeeder;

    @Inject
    public SeedAll(DepartmentDataSeeder departmentDataSeeder, UserDataSeeder userDataSeeder) {
        this.departmentDataSeeder = departmentDataSeeder;
        this.userDataSeeder = userDataSeeder;
    }

    @Transactional
    public void onStart(@Observes StartupEvent ev) {
        seedAll();
    }
    @Transactional
    public void seedAll() {
        departmentDataSeeder.seedIfNeeded();
        userDataSeeder.seedIfNeeded();
    }
}
