package data.entities;

import jakarta.persistence.*;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "users", schema = "application")
public class UserEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true)
    private String userId;

    private String firstName;
    private String lastName;
    private String email;

    @ManyToOne
    @JoinColumn(name = "department_id")
    private DepartmentEntity departmentEntity;

    private String plant;

    @ManyToMany(mappedBy = "assignedUsers")
    private Set<CertificateEntity> assignedCertificateEntities = new HashSet<>();

    @OneToMany(mappedBy = "user")
    private List<CommentEntity> commentEntities = new ArrayList<>();

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
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
        return departmentEntity;
    }

    public void setDepartment(DepartmentEntity departmentEntity) {
        this.departmentEntity = departmentEntity;
    }

    public String getPlant() {
        return plant;
    }

    public void setPlant(String plant) {
        this.plant = plant;
    }

    public Set<CertificateEntity> getAssignedCertificates() {
        return assignedCertificateEntities;
    }

    public void setAssignedCertificates(Set<CertificateEntity> assignedCertificateEntities) {
        this.assignedCertificateEntities = assignedCertificateEntities;
    }

    public List<CommentEntity> getComments() {
        return commentEntities;
    }

    public void setComments(List<CommentEntity> commentEntities) {
        this.commentEntities = commentEntities;
    }
}