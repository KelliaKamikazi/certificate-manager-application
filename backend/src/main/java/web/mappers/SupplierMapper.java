package web.mappers;

import data.entities.SupplierEntity;
import jakarta.enterprise.context.ApplicationScoped;
import web.dtos.SupplierDto;

import java.util.stream.Collectors;
@ApplicationScoped
public class SupplierMapper {

    public SupplierDto toDTO(SupplierEntity entity) {
        SupplierDto dto = new SupplierDto();
        dto.setId(entity.getId());
        dto.setName(entity.getName());
        dto.setCity(entity.getCity());

        dto.setCertificateIds(
                entity.getCertificates().stream()
                        .map(certificate -> certificate.getId())
                        .collect(Collectors.toList())
        );
        return dto;
    }

    public SupplierEntity toEntity(SupplierDto dto) {
        SupplierEntity entity = new SupplierEntity();
        entity.setId(dto.getId());
        entity.setName(dto.getName());
        entity.setCity(dto.getCity());
        return entity;
    }
}

