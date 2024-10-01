package web.resources;

import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import services.SupplierService;
import web.dtos.SupplierDto;

import java.util.List;

@Path("/suppliers")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class SupplierResource {

    @Inject
    SupplierService supplierService;

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public List<SupplierDto> getSuppliers() {
        return supplierService.getSuppliers();
    }

    @GET
    @Path("/id/{id}")
    public Response getSupplierById(@PathParam("id") Long id) {
        SupplierDto supplierDTO = supplierService.findById(id);
        if (supplierDTO == null) {
            return Response.status(Response.Status.NOT_FOUND).build();
        }
        return Response.ok(supplierDTO).build();
    }

    @GET
    @Path("/name/{name}")
    public Response getSuppliersByName(@PathParam("name") String name) {
        List<SupplierDto> supplierDTOs = supplierService.findByName(name);
        if (supplierDTOs.isEmpty()) {
            return Response.status(Response.Status.NOT_FOUND).build();
        }
        return Response.ok(supplierDTOs).build();
    }

    @GET
    @Path("/city/{city}")
    public Response getSuppliersByCity(@PathParam("city") String city) {
        List<SupplierDto> supplierDTOs = supplierService.findByCity(city);
        if (supplierDTOs.isEmpty()) {
            return Response.status(Response.Status.NOT_FOUND).build();
        }
        return Response.ok(supplierDTOs).build();
    }
}