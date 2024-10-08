package data.entities;

import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "suppliers", schema = "certificates")
public class SupplierEntity {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  private String name;
  private String city;

  @OneToMany(mappedBy = "supplier")
  private List<CertificateEntity> certificates = new ArrayList<>();

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public String getCity() {
    return city;
  }

  public void setCity(String city) {
    this.city = city;
  }

  public List<CertificateEntity> getCertificates() {
    return certificates;
  }

  public void setCertificates(List<CertificateEntity> certificates) {
    this.certificates = certificates;
  }
}
