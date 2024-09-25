package web.dtos;
import java.util.List;
public class SupplierDto {

    private Long id;
    private String name;
    private String city;
    private List<Long> certificateIds;

    public SupplierDto() {
    }

    public SupplierDto(Long id, String name,  String city, List<Long> certificateIds) {
        this.id = id;
        this.name = name;
        this.city = city;
        this.certificateIds = certificateIds;
    }

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

    public List<Long> getCertificateIds() {
        return certificateIds;
    }

    public void setCertificateIds(List<Long> certificateIds) {
        this.certificateIds = certificateIds;
    }
    @Override
    public String toString() {
        return "SupplierDto{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", city='" + city + '\'' +
                ", certificateIds=" + certificateIds +
                '}';
    }
}
