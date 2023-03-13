package program.services;

import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import program.dto.categories.CategoryCreateDTO;
import program.dto.categories.CategoryItemDTO;
import program.dto.categories.CategoryUpdateDTO;
import program.entities.CategoryEntity;
import program.iterfaces.CategoryService;
import program.mapper.CategoryMapper;
import program.repositories.CategoryRepository;
import program.storage.IStorageService;

import java.util.List;

@Service
@AllArgsConstructor
public class CategoryServiceImpl implements CategoryService {
    private final CategoryRepository categoryRepository;
    private final CategoryMapper categoryMapper;
    private final IStorageService storageService;
    ModelMapper modelMapper;
    @Override
    public List<CategoryItemDTO> get() {
        var list = categoryMapper.categoriesToCategoryItems(categoryRepository.findAll());
        return list;
    }

    @Override
    public CategoryItemDTO create(CategoryCreateDTO model) throws Exception {
        var modelImage = model.getImage();
        if(modelImage != "" && modelImage != null) {
            String imageName = storageService.save(modelImage);
            model.setImage(imageName);
        }
        model.setName(model.getName());
        model.setDescription(model.getDescription());

        var mappedCategory = modelMapper.map(model, CategoryEntity.class);
        categoryRepository.save(mappedCategory);
        var result = categoryMapper.categoryToCategoryItem(mappedCategory);
        return result;
    }

    @Override
    public CategoryItemDTO get(int id) {
        var categoryOptinal = categoryRepository.findById(id);
        if(categoryOptinal.isPresent())
        {
            var model = categoryMapper.categoryToCategoryItem(categoryOptinal.get());
            return model;
        }
        return null;
    }

    @Override
    public CategoryItemDTO update(int id, CategoryUpdateDTO model) throws Exception {
        var category = categoryRepository.findById(id).get();
        if(category!= null)
        {
            var modelImage = model.getImage();
            var newCategory = category;
            if(modelImage.startsWith("data:image")) {
                storageService.delete(category.getImage());
                String newImage = storageService.save(modelImage);
                newCategory.setImage(newImage);
            }
            else if(modelImage == null || modelImage == "") {
                storageService.delete(category.getImage());
                newCategory.setImage(null);
            }
            newCategory.setName(model.getName());
            newCategory.setDescription(model.getDescription());

            categoryRepository.save(newCategory);
            var result = categoryMapper.categoryToCategoryItem(newCategory);
            return result;
        }
        return null;
    }

    @Override
    public void delete(int id) throws Exception {
        CategoryEntity category = categoryRepository.findById(id).get();
        if(category == null) {
            new Exception("Category is null");
            return;
        }
        var image = category.getImage();
        if(image != null && image != "") {
            storageService.delete(category.getImage());
        }
        categoryRepository.deleteById(id);
    }
}
