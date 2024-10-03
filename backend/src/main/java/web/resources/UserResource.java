package web.resources;

import jakarta.enterprise.context.ApplicationScoped;
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
@ApplicationScoped
public class UserResource {

    @Inject
    private UserService userService;

    @GET
    public Response getAllUsers() {
        List<UserDto> users = userService.getAllUsers();
        return Response.ok(users).build();
    }

    @POST
    @Path("/byIds")
    public Response getUsersByIds(@QueryParam("ids") List<Long> userIds) {
        List<UserDto> users = userService.getUsersByIds(userIds);
        return Response.ok(users).build();
    }

    @GET
    @Path("/{id}")
    public Response getUserById(@PathParam("id") Long id) {
        UserDto user = userService.getUserById(id);
        if (user == null) {
            return Response.status(Response.Status.NOT_FOUND)
                    .entity("User not found")
                    .build();
        }
        return Response.ok(user).build();
    }

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