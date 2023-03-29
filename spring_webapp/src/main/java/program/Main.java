package program;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.enums.SecuritySchemeIn;
import io.swagger.v3.oas.annotations.enums.SecuritySchemeType;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.security.SecurityScheme;
import org.modelmapper.ModelMapper;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import program.iterfaces.SeedService;
import program.storage.StorageProperties;
import program.storage.IStorageService;


@SpringBootApplication
@EnableConfigurationProperties(StorageProperties.class)
@SecurityScheme(name = "burdiuh-api", scheme = "bearer", type = SecuritySchemeType.HTTP, in = SecuritySchemeIn.HEADER)
@OpenAPIDefinition(info = @Info(title = "Shop API", version = "2.0", description = "List Products"))
public class Main {
    public static void main(String[] args) {
        System.out.println("Hello String Boot!");
        SpringApplication.run(Main.class, args);
    }
    @Bean
    public ModelMapper modelMapper(){
        return new ModelMapper();
    }
    @Bean
    CommandLineRunner init(IStorageService storageService, SeedService seedService) {
        return (args) -> {
          try {
              storageService.init();
              seedService.seedRoleData();
              seedService.seedUserData();

          } catch(Exception ex) {
              System.out.println("---Хюсто у нас проблеми---"+ ex.getMessage());
          }
        };
    }

}
