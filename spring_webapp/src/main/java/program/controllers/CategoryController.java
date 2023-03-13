package program.controllers;

import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import program.dto.categories.CategoryCreateDTO;
import program.dto.categories.CategoryItemDTO;
import program.dto.categories.CategoryUpdateDTO;
import program.iterfaces.CategoryService;


import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("api/categories")
public class CategoryController {
    private final CategoryService categoryService;

    @GetMapping
    public ResponseEntity<List<CategoryItemDTO>> index() {
        return new ResponseEntity<>(categoryService.get(), HttpStatus.OK);
    }
    @PostMapping()
    public ResponseEntity<CategoryItemDTO> create(@Valid @RequestBody CategoryCreateDTO model) throws Exception {
        var result = categoryService.create(model);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }
    @GetMapping("{id}")
    public ResponseEntity<CategoryItemDTO> getCategoryById(@PathVariable("id") int categoryId) {
        var category = categoryService.get(categoryId);
        if(category!=null)
        {
            return new ResponseEntity<>(category, HttpStatus.OK);
        }
        return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
    }
    @PutMapping("/update/{id}")
    public ResponseEntity<CategoryItemDTO> update(@PathVariable("id") int categoryId,
                                                 @RequestBody CategoryUpdateDTO model) throws Exception {
        var result = categoryService.update(categoryId, model);
        if(result!=null)
        {
            return new ResponseEntity<>(result, HttpStatus.OK);
        }
        return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
    }
    @DeleteMapping("{id}")
    public ResponseEntity<String> delete(@PathVariable("id") int categoryId) throws Exception {
        categoryService.delete(categoryId);
        return new ResponseEntity<>("Катагорія знищена.", HttpStatus.OK);
    }
}

