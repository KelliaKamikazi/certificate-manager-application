package web.dtos;

import java.util.List;
import java.util.Set;

public class UserDto {

  private Long id;
  private String userIndex;
  private String firstName;
  private String lastName;
  private String email;
  private DepartmentDto department;
  private String plant;
  private Set<Long> assignedCertificateIds;
  private List<Long> commentIds;

  public UserDto() {}

  public UserDto(
      Long id,
      String userIndex,
      String firstName,
      String lastName,
      String email,
      DepartmentDto department,
      String plant,
      Set<Long> assignedCertificateIds,
      List<Long> commentIds) {
    this.id = id;
    this.userIndex = userIndex;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.department = department;
    this.plant = plant;
    this.assignedCertificateIds = assignedCertificateIds;
    this.commentIds = commentIds;
  }

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

  public DepartmentDto getDepartment() {
    return department;
  }

  public void setDepartment(DepartmentDto department) {
    this.department = department;
  }

  public String getPlant() {
    return plant;
  }

  public void setPlant(String plant) {
    this.plant = plant;
  }

  public Set<Long> getAssignedCertificateIds() {
    return assignedCertificateIds;
  }

  public void setAssignedCertificateIds(Set<Long> assignedCertificateIds) {
    this.assignedCertificateIds = assignedCertificateIds;
  }

  public List<Long> getCommentIds() {
    return commentIds;
  }

  public void setCommentIds(List<Long> commentIds) {
    this.commentIds = commentIds;
  }

  @Override
  public String toString() {
    return "UserDto{"
        + "id="
        + id
        + ", userIndex='"
        + userIndex
        + '\''
        + ", firstName='"
        + firstName
        + '\''
        + ", lastName='"
        + lastName
        + '\''
        + ", email='"
        + email
        + '\''
        + ", department='"
        + department
        + '\''
        + ", plant='"
        + plant
        + '\''
        + ", assignedCertificateIds="
        + assignedCertificateIds
        + ", commentIds="
        + commentIds
        + '}';
  }
}
