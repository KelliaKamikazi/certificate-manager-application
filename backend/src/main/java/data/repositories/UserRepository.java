package data.repositories;

import data.entities.DepartmentEntity;
import data.entities.UserEntity;
import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.transaction.Transactional;

import java.util.List;

@ApplicationScoped
@Transactional(Transactional.TxType.MANDATORY)
public class UserRepository implements PanacheRepository<UserEntity> {
    //Additional methods
    public List<UserEntity> findByDepartment(DepartmentEntity department) {
        return find("department", department).list();
    }
}
