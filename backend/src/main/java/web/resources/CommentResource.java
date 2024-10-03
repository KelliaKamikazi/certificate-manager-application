package web.resources;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import services.CommentService;
import web.dtos.CommentDto;

import java.util.List;

@Path("/comments")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
@ApplicationScoped
public class CommentResource {
    @Inject
    CommentService commentService;

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public List<CommentDto> getCertificates() {
        return commentService.getAllComments();
    }

    @POST
    public Response createComment(CommentDto commentDto) {
        CommentDto createdComment = commentService.createComment(commentDto);
        return Response.status(Response.Status.CREATED).entity(createdComment).build();
    }

}
