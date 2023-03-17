package program.services;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import program.dto.products.ProductCreateDTO;
import program.dto.products.ProductEditDTO;
import program.dto.products.ProductItemDTO;
import program.entities.CategoryEntity;
import program.entities.ProductEntity;
import program.entities.ProductImageEntity;
import program.iterfaces.ProductService;
import program.mapper.ProductMapper;
import program.repositories.ProductImageRepository;
import program.repositories.ProductRepository;
import program.storage.IStorageService;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
@AllArgsConstructor
public class ProductServiceImpl implements ProductService {
    private final ProductRepository productRepository;
    private final ProductImageRepository productImageRepository;
    private final IStorageService storageService;
    private final ProductMapper productMapper;
    @Override
    public ProductItemDTO create(ProductCreateDTO model) {
        var p = new ProductEntity();
        var cat = new CategoryEntity();
        cat.setId(model.getCategory_id());
        p.setName(model.getName());
        p.setDescription(model.getDescription());
        p.setPrice(model.getPrice());
        p.setDateCreated(new Date());
        p.setCategory(cat);
        p.setDelete(false);
        productRepository.save(p);
        int priority=1;
        for (var img : model.getFiles()) {
            var file = storageService.saveMultipartFile(img);
            ProductImageEntity pi = new ProductImageEntity();
            pi.setName(file);
            pi.setDateCreated(new Date());
            pi.setPriority(priority);
            pi.setDelete(false);
            pi.setProduct(p);
            productImageRepository.save(pi);
            priority++;
        }
        return null;
    }

    @Override
    public ProductItemDTO edit(int id, ProductEditDTO model) throws Exception {
        var p = productRepository.findById(id);
        if(p.isPresent())
        {
            var product = p.get();
            for (var name: model.getRemoveFiles()) {
                var pi = productImageRepository.findByName(name);
                if(pi!=null)
                {
                    productImageRepository.delete(pi);
                    storageService.delete(name);
                }
            }
            var cat = new CategoryEntity();
            cat.setId(model.getCategory_id());
            product.setName(model.getName());
            product.setDescription(model.getDescription());
            product.setPrice(model.getPrice());
            product.setDateCreated(new Date());
            product.setCategory(cat);
            productRepository.save(product);
            var productImages = product.getProductImages();
            int priority=1;
            for (var pi : productImages)
            {
                if(pi.getPriority()>priority)
                    priority=pi.getPriority();
            }
            priority++;
            for (var img : model.getFiles()) {
                var file = storageService.saveMultipartFile(img);
                ProductImageEntity pi = new ProductImageEntity();
                pi.setName(file);
                pi.setDateCreated(new Date());
                pi.setPriority(priority);
                pi.setDelete(false);
                pi.setProduct(product);
                productImageRepository.save(pi);
                priority++;
            }
        }

        return null;
    }

    @Override
    public List<ProductItemDTO> get() {
        var list = new ArrayList<ProductItemDTO>();
        var data = productRepository.findAll();
        for(var product : data) {
            ProductItemDTO productItemDTO = new ProductItemDTO();

            productItemDTO.setCategory( product.getCategory().getName() );
            productItemDTO.setId( product.getId() );
            productItemDTO.setName( product.getName() );
            productItemDTO.setPrice( product.getPrice() );
            productItemDTO.setDescription( product.getDescription() );

            var items = new ArrayList<String>();
            for (var img : product.getProductImages())
            {
                items.add(img.getName());
            }
            productItemDTO.setFiles(items);
            list.add(productItemDTO);
        }
        return list;
    }

    @Override
    public ProductItemDTO getById(int id) {
        var productOptinal = productRepository.findById(id);
        if(productOptinal.isPresent())
        {
            var product = productOptinal.get();
            var data =  productMapper.ProductItemDTOByProduct(product);
            for(var img : product.getProductImages())
                data.getFiles().add(img.getName());
            return data;
        }
        return null;
    }

    @Override
    public void delete(int id) throws Exception {
        var productOptinal = productRepository.findById(id);
        if(productOptinal.isPresent()){
            var product = productOptinal.get();
            for(var img : product.getProductImages()){
                if (img!=null && img.getName()!=""){
                    var smt = 0;
                }
                storageService.delete(img.getName());
            }
            productRepository.delete(product);
        }
    }


}
