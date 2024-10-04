package web.resources;

import data.entities.CertificateType;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import services.CertificateService;
import web.dtos.CertificateDto;

import java.util.List;

@Path("/certificates")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
@ApplicationScoped
public class CertificateResource {

    @Inject
    CertificateService certificateService;

    @GET
    public List<CertificateDto> getCertificates() {
        return certificateService.getCertificates();
    }


    @GET
    @Path("/{id}")
    public Response getCertificateById(@PathParam("id") Long id) {
        try {
            CertificateDto certificate = certificateService.getCertificateById(id);
            return Response.ok(certificate).build();
        } catch (NotFoundException e) {
            return Response.status(Response.Status.NOT_FOUND).entity(e.getMessage()).build();
        }
    }

    @POST

    public Response createCertificate(CertificateDto certificateDto) {
        CertificateDto createdCertificate = certificateService.createCertificate(certificateDto);
        return Response.status(Response.Status.CREATED).entity(createdCertificate).build();
    }

    @PUT
    @Path("/{id}")
    public Response updateCertificate(@PathParam("id") Long id, CertificateDto certificateDto) {
        try {
            CertificateDto updatedCertificate = certificateService.updateCertificateDto(id, certificateDto);
            return Response.ok(updatedCertificate).build();
        } catch (NotFoundException e) {
            return Response.status(Response.Status.NOT_FOUND).entity(e.getMessage()).build();
        }
    }

    @DELETE
    @Path("/{id}")
    public Response deleteCertificate(@PathParam("id") Long id) {
        try {
            certificateService.deleteCertificateDto(id);
            return Response.noContent().build();
        } catch (RuntimeException e) {
            return Response.status(Response.Status.NOT_FOUND).entity(e.getMessage()).build();
        }
    }

    @GET
    @Path("/types")
    public Response getCertificateTypes() {
        List<CertificateType> certificateTypes = certificateService.getCertificateTypes();
        return Response.ok(certificateTypes).build();
    }

    @DELETE
    @Path("/{certificateId}/assignedUsers/{userId}")
    public Response removeAssignedUser(@PathParam("certificateId") Long certificateId, @PathParam("userId") Long userId) {
        try {
            certificateService.removeAssignedUser(certificateId, userId);
            return Response.ok().build();
        } catch (NotFoundException e) {
            return Response.status(Response.Status.NOT_FOUND).entity(e.getMessage()).build();
        } catch (Exception e) {
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity("Error removing assigned user").build();
        }
    }
}
