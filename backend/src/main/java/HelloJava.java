import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;

@Path("/api/hello")
public class HelloJava {

    @GET
    @Produces(MediaType.TEXT_PLAIN)
    public String getHelloJava() {
        String message = "Hello Java";
        return message;
    }
}
