package web.resources.SeedTheDatabase;
import data.entities.DepartmentEntity;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.persistence.EntityManager;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Root;
import java.util.Arrays;
import java.util.List;

@ApplicationScoped
public class DepartmentDataSeeder {

    @Inject
    EntityManager entityManager;

    public void seedData() {
        if (isSeederNeeded()) {
            seedDepartments();
            System.out.println("Departments seeded.");
        }
    }

    private boolean isSeederNeeded() {
        CriteriaBuilder cb = entityManager.getCriteriaBuilder();
        CriteriaQuery<Long> query = cb.createQuery(Long.class);
        Root<DepartmentEntity> root = query.from(DepartmentEntity.class);
        query.select(cb.count(root));
        Long count = entityManager.createQuery(query).getSingleResult();
        return count == 0;
    }

    private void seedDepartments() {
        List<DepartmentEntity> departments = Arrays.asList(
                createDepartment("ITM/FP"),
                createDepartment("IMM/FP")
        );
        for (DepartmentEntity department : departments) {
            entityManager.persist(department);
        }
    }

    private DepartmentEntity createDepartment(String name) {
        DepartmentEntity department = new DepartmentEntity();
        department.setName(name);
        return department;
    }
}