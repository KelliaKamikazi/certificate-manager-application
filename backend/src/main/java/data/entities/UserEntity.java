package data.entities;

import jakarta.persistence.*;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.Email;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "users", schema = "certificates")
public class UserEntity {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(unique = true, name = "user_index")
  private String userIndex;

  @Column(name = "first_name")
  private String firstName;

  @Column(name = "last_name")
  private String lastName;

  @Email private String email;

  @ManyToOne
  @JoinColumn(name = "department_id")
  private DepartmentEntity department;

  private String plant;

  @ManyToMany(mappedBy = "assignedUsers")
  private Set<CertificateEntity> assignedCertificates = new HashSet<>();

  @OneToMany(mappedBy = "user")
  private Set<CommentEntity> comments = new HashSet<>();

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public String getUserIndex() {
    return userIndex;
  }

  public void setUserIndex(String userIndex) {
    this.userIndex = userIndex;
  }

  public String getFirstName() {
    return firstName;
  }

  public void setFirstName(String firstName) {
    this.firstName = firstName;
  }

  public String getLastName() {
    return lastName;
  }

  public void setLastName(String lastName) {
    this.lastName = lastName;
  }

  public String getEmail() {
    return email;
  }

  public void setEmail(String email) {
    this.email = email;
  }

  public DepartmentEntity getDepartment() {
    return department;
  }

  public void setDepartment(DepartmentEntity department) {
    this.department = department;
  }

  public String getPlant() {
    return plant;
  }

  public void setPlant(String plant) {
    this.plant = plant;
  }

  public Set<CertificateEntity> getAssignedCertificates() {
    return assignedCertificates;
  }

  public void setAssignedCertificates(Set<CertificateEntity> assignedCertificates) {
    this.assignedCertificates = assignedCertificates;
  }

  public Set<CommentEntity> getComments() {
    return comments;
  }

  public void setComments(Set<CommentEntity> comments) {
    this.comments = comments;
  }
}
