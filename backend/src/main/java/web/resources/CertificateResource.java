package web.resources;

import data.entities.CertificateType;
import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import services.CertificateService;
import web.dtos.CertificateDto;

import java.util.List;

@Path("/certificates")
public class CertificateResource {

    @Inject
    CertificateService certificateService;

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public List<CertificateDto> getCertificates() {
        return certificateService.getCertificates();
    }

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response createCertificate(CertificateDto certificateDto) {
        CertificateDto createdCertificate = certificateService.createCertificate(certificateDto);
        return Response.status(Response.Status.CREATED).entity(createdCertificate).build();
    }

    @PUT
    @Path("/{id}")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
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
    @Produces(MediaType.APPLICATION_JSON)
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
    @Produces(MediaType.APPLICATION_JSON)
    public Response getCertificateTypes() {
        List<CertificateType> certificateTypes = certificateService.getCertificateTypes();
        return Response.ok(certificateTypes).build();
    }
}
