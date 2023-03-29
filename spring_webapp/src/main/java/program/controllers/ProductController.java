package program.controllers;

import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import program.dto.products.ProductCreateDTO;
import program.dto.products.ProductEditDTO;
import program.dto.products.ProductItemDTO;
import program.iterfaces.ProductService;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("api/products")
@SecurityRequirement(name = "burdiuh-api")
public class ProductController {
    private final ProductService productService;

    @GetMapping
    public ResponseEntity<List<ProductItemDTO>> index() {
        return new ResponseEntity<>(productService.get(), HttpStatus.OK);
    }

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<ProductItemDTO> create(@Valid @ModelAttribute ProductCreateDTO model) {
        var result = productService.create(model);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @PutMapping(value = "{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<ProductItemDTO> edit(@PathVariable("id") int id,
                                               @Valid @ModelAttribute ProductEditDTO model) throws Exception {
        var result = productService.edit(id, model);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @GetMapping("{id}")
    public ResponseEntity<ProductItemDTO> getProductById(@PathVariable("id") int id) {
        var product = productService.getById(id);
        if(product!=null)
        {
            return new ResponseEntity<>(product, HttpStatus.OK);
        }
        return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
    }

  @DeleteMapping("{id}")
    public ResponseEntity<ProductItemDTO> delete(@PathVariable("id") int id) throws Exception {
       var product =  productService.getById(id);
        if(product!=null){
            productService.delete(id);
            return new ResponseEntity<>(null, HttpStatus.OK);
        }
      return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
  }


}
