package program;

import org.modelmapper.ModelMapper;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import program.storage.StorageProperties;
import program.storage.IStorageService;


@SpringBootApplication
@EnableConfigurationProperties(StorageProperties.class)
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
    CommandLineRunner init(IStorageService storageService) {
        return (args) -> {
          try {
              storageService.init();

          } catch(Exception ex) {
              System.out.println("---Хюсто у нас проблеми---"+ ex.getMessage());
          }
        };
    }

}
