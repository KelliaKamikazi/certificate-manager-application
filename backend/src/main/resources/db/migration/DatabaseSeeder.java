//package db.migration;
//
//import io.quarkus.runtime.StartupEvent;
//import jakarta.enterprise.event.Observes;
//import jakarta.inject.Inject;
//import jakarta.inject.Singleton;
//import org.flywaydb.core.Flyway;
//import org.jboss.logging.Logger;
//
//@Singleton
//public class DatabaseSeeder {
//    private static final Logger LOG = Logger.getLogger(DatabaseSeeder.class);
//
//    @Inject
//    Flyway flyway;
//
//    void onStart(@Observes StartupEvent ev) {
//        LOG.info("The application is starting...");
//        runMigrations();
//    }
//
//    private void runMigrations() {
//        try {
//            LOG.info("Checking for pending migrations...");
//            if (flyway.info().pending().length > 0) {
//                LOG.info("Running database migrations...");
//                flyway.migrate();
//                LOG.info("Database migrations completed successfully.");
//            } else {
//                LOG.info("No pending migrations found.");
//            }
//        } catch (Exception e) {
//            LOG.error("Error during database migration", e);
//        }
//    }
//
//    public void resetAndSeedDatabase() {
//        LOG.info("Resetting and seeding the database...");
//        flyway.clean();
//        flyway.migrate();
//        LOG.info("Database reset and seeded successfully.");
//    }
//}