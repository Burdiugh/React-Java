package program.mapper;

import java.util.ArrayList;
import java.util.List;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;
import program.dto.categories.CategoryCreateDTO;
import program.dto.categories.CategoryItemDTO;
import program.entities.CategoryEntity;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2023-03-14T16:29:42+0200",
    comments = "version: 1.5.3.Final, compiler: javac, environment: Java 19.0.2 (Oracle Corporation)"
)
@Component
public class CategoryMapperImpl implements CategoryMapper {

    @Override
    public CategoryItemDTO categoryToCategoryItem(CategoryEntity category) {
        if ( category == null ) {
            return null;
        }

        CategoryItemDTO categoryItemDTO = new CategoryItemDTO();

        categoryItemDTO.setId( category.getId() );
        categoryItemDTO.setName( category.getName() );
        categoryItemDTO.setImage( category.getImage() );
        categoryItemDTO.setDescription( category.getDescription() );

        return categoryItemDTO;
    }

    @Override
    public List<CategoryItemDTO> categoriesToCategoryItems(List<CategoryEntity> categories) {
        if ( categories == null ) {
            return null;
        }

        List<CategoryItemDTO> list = new ArrayList<CategoryItemDTO>( categories.size() );
        for ( CategoryEntity categoryEntity : categories ) {
            list.add( categoryToCategoryItem( categoryEntity ) );
        }

        return list;
    }

    @Override
    public CategoryEntity categoryCreateToCategory(CategoryCreateDTO model) {
        if ( model == null ) {
            return null;
        }

        CategoryEntity categoryEntity = new CategoryEntity();

        categoryEntity.setName( model.getName() );
        categoryEntity.setImage( model.getImage() );
        categoryEntity.setDescription( model.getDescription() );

        return categoryEntity;
    }
}
