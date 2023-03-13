package program.mapper;

import org.mapstruct.Mapper;
import program.dto.categories.CategoryCreateDTO;
import program.dto.categories.CategoryItemDTO;
import program.entities.CategoryEntity;

import java.util.List;

@Mapper(componentModel = "spring")
public interface CategoryMapper {
    CategoryItemDTO categoryToCategoryItem(CategoryEntity category);
    List<CategoryItemDTO> categoriesToCategoryItems(List<CategoryEntity> categories);

    CategoryEntity categoryCreateToCategory(CategoryCreateDTO model);
}
