package program.iterfaces;


import program.dto.products.ProductCreateDTO;
import program.dto.products.ProductEditDTO;
import program.dto.products.ProductItemDTO;

import java.util.List;

public interface ProductService {
    ProductItemDTO create(ProductCreateDTO model);
    ProductItemDTO edit(int id, ProductEditDTO model) throws Exception;
    List<ProductItemDTO> get();
    ProductItemDTO getById(int id);
}

