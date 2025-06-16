# Use a lightweight JDK image to run the app
FROM eclipse-temurin:21-jdk
WORKDIR /app

# Copy the built JAR from your local target folder to the container
COPY target/*-runner.jar app.jar

# Expose the port your app listens on
EXPOSE 8080

# Run the application
CMD ["java", "-jar", "app.jar"]
