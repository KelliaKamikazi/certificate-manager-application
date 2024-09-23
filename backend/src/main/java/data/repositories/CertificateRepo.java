package data.repositories;


import data.entities.Certificate;
import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.transaction.Transactional;

@ApplicationScoped
@Transactional(Transactional.TxType.MANDATORY)
public class CertificateRepo implements PanacheRepository<Certificate> {
    //Additional methods
}