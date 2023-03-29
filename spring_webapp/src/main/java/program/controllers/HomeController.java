package program.controllers;

import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import lombok.AllArgsConstructor;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import program.dto.UploadImageDto;
import program.dto.categories.CategoryCreateDTO;
import program.entities.CategoryEntity;
import program.repositories.CategoryRepository;
import program.storage.IStorageService;

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("api/home")
public class HomeController {
    private CategoryRepository categoryRepository;
    private final IStorageService storageService;
    @GetMapping
    public ResponseEntity<List<CategoryEntity>> index() {
        var list = categoryRepository.findAll();
        return new ResponseEntity<>(list, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<CategoryEntity> create(@RequestBody CategoryCreateDTO model) {
        var category = new CategoryEntity();
        category.setName(model.getName());
        categoryRepository.save(category);
        var list = categoryRepository.findAll();
        return new ResponseEntity<>(category, HttpStatus.CREATED);
    }

    @PostMapping("/upload")
    public String upload(@RequestBody UploadImageDto dto) throws Exception {
        String fileName = storageService.save(dto.getBase64());
        return fileName;
    }

    @GetMapping("/files/{filename:.+}")
    @ResponseBody
    public ResponseEntity<Resource> serverfile(@PathVariable String filename) throws Exception {
        Resource file = storageService.load(filename);
        String urlFileName = URLEncoder.encode("Сало.jpg", StandardCharsets.UTF_8);
        return ResponseEntity.ok()
                .contentType(MediaType.IMAGE_JPEG)
                .header(HttpHeaders.CONTENT_DISPOSITION, "filename=\""+urlFileName+"\"")
                .body(file);
    }
}
