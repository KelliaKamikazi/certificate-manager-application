package web.resources;

import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import services.UserService;
import web.dtos.UserDto;

import java.util.List;

@Path("/users")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class UserResource {

    @Inject
    private UserService userService;

    @GET
    @Path("/search")
    public Response searchUsers(
            @QueryParam("userId") String userId,
            @QueryParam("firstName") String firstName,
            @QueryParam("lastName") String lastName,
            @QueryParam("email") String email,
            @QueryParam("department") String department,
            @QueryParam("plant") String plant) {

        List<UserDto> users = userService.searchUsers(userId, firstName, lastName, email, department, plant);
        return Response.ok(users).build();
    }
}