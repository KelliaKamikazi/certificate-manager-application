package data.repositories;

import data.entities.Department;
import data.entities.User;
import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.transaction.Transactional;

import java.util.List;

@ApplicationScoped
@Transactional(Transactional.TxType.MANDATORY)
public class UserRepo implements PanacheRepository<User> {
    //Additional methods
    public List<User> findByDepartment(Department department) {
        return find("department", department).list();
    }
    public User findUserById(Long id) {
        return findById(id);
    }
}
