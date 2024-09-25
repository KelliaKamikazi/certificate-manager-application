package web.resources;


import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import services.SupplierService;
import web.dtos.SupplierDto;

import java.awt.*;

@Path("/suppliers")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class SupplierResource {

    @Inject
    SupplierService supplierService;

    @GET
    @Path("/id/{id}")
    public Response getSupplierByName(@PathParam("id") Long id) {
        SupplierDto supplierDTO = supplierService.findById(id);
        if (supplierDTO == null) {
            return Response.status(Response.Status.NOT_FOUND).build();
        }
        return Response.ok(supplierDTO).build();
    }


    @GET
    @Path("/name/{name}")
    public Response getSupplierByName(@PathParam("name") String name) {
        SupplierDto supplierDTO = supplierService.findByName(name);
        if (supplierDTO == null) {
            return Response.status(Response.Status.NOT_FOUND).build();
        }
        return Response.ok(supplierDTO).build();
    }

    @GET
    @Path("/city/{city}")
    public Response getSupplierByCity(@PathParam("city") String city) {
        SupplierDto supplierDTO = supplierService.findByCity(city);
        if (supplierDTO == null) {
            return Response.status(Response.Status.NOT_FOUND).build();
        }
        return Response.ok(supplierDTO).build();
    }


}
