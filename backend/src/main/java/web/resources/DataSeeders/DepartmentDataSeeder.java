package web.resources.DataSeeders;

import data.entities.DepartmentEntity;
import jakarta.inject.Singleton;
import jakarta.persistence.EntityManager;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Root;
import jakarta.transaction.Transactional;
import java.util.Arrays;
import java.util.List;

@Singleton
public class DepartmentDataSeeder {

    private final EntityManager entityManager;

    public DepartmentDataSeeder(EntityManager entityManager) {
        this.entityManager = entityManager;
    }

    @Transactional
    public void seedIfNeeded() {
        CriteriaBuilder cb = entityManager.getCriteriaBuilder();
        CriteriaQuery<Long> query = cb.createQuery(Long.class);
        Root<DepartmentEntity> root = query.from(DepartmentEntity.class);
        query.select(cb.count(root));

        Long count = entityManager.createQuery(query).getSingleResult();

        if (count == 0) {
            seedDepartments();
            System.out.println("Departments seeded.");
        }
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
