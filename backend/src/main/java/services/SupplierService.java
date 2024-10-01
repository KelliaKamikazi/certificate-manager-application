package services;

import data.entities.SupplierEntity;
import data.repositories.SupplierRepository;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import web.dtos.SupplierDto;
import web.mappers.SupplierMapper;

import java.util.List;
import java.util.stream.Collectors;

@ApplicationScoped
@Transactional
public class SupplierService {
    @Inject
    SupplierRepository supplierRepository;
    @Inject
    SupplierMapper supplierMapper;

    public List<SupplierDto> getSuppliers() {
        return supplierRepository.listAll().stream()
                .map(supplierMapper::toDTO)
                .collect(Collectors.toList());
    }

    public List<SupplierDto> findByName(String name) {
        List<SupplierEntity> entities = supplierRepository.findByName(name);
        return entities.stream()
                .map(supplierMapper::toDTO)
                .collect(Collectors.toList());
    }

    public List<SupplierDto> findByCity(String city) {
        List<SupplierEntity> entities = supplierRepository.findByCity(city);
        return entities.stream()
                .map(supplierMapper::toDTO)
                .collect(Collectors.toList());
    }

    public SupplierDto findById(Long id) {
        SupplierEntity entity = supplierRepository.findById(id);
        return supplierMapper.toDTO(entity);
    }
}