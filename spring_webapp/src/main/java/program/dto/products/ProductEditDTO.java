package program.dto.products;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;

@Data
public class ProductEditDTO {
    private String name;
    private double price;
    private String description;
    private int category_id;


    private List<String> removeFiles = new ArrayList<>();

    private List<MultipartFile> files = new ArrayList<>();
}
