using Inventory.API.Models.Domain;
using Inventory.API.Models.DTO;
using Inventory.API.Repositories.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Identity.Client;

namespace Inventory.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly IProductRepository productRepository;
        private readonly ICategoryRepository categoryRepository;

        public ProductController(IProductRepository productRepository, ICategoryRepository categoryRepository)
        {
            this.productRepository = productRepository;
            this.categoryRepository = categoryRepository;
        }
        [HttpPost]
        public async Task<IActionResult> CreateProduct([FromBody] CreateProductRequestDto request)
        {
            //Map DTO to Domain Model


            var product = new Product
            {
                ProductName = request.ProductName,
                ProductDescription = request.ProductDescription,
                ProductPrice = request.ProductPrice,
                ProductQuantity = request.ProductQuantity,
                Categories = new List<Category>()


            };
            foreach (var categoryGuid in request.Categories)
            {
                var existingCategory = await categoryRepository.GetById(categoryGuid);
                if (existingCategory is not null)
                {
                    product.Categories.Add(existingCategory);
                }
            }

            product = await productRepository.CreateAsync(product);                 

            //Map Domain model to DTO
            

            var response = new ProductDto
            {
                Id = product.Id,
                ProductName = product.ProductName,
                ProductDescription = product.ProductDescription,
                ProductPrice = product.ProductPrice,
                ProductQuantity = product.ProductQuantity,
                Categories = product.Categories.Select(x => new CategoryDto
                { Id = x.Id,
                  CategoryDescription = x.CategoryDescription,
                  CategoryName = x.CategoryName
                }).ToList()
            };


            return Ok(response);
        }
        [HttpGet]
        public async Task<IActionResult> GetAllProducts()
        {
            var products = await productRepository.GetAllAsync();

            //Map Domain model to DTO

            var response = new List<ProductDto>();

            foreach (var product in products)
            {
                response.Add(new ProductDto
                {
                    Id = product.Id,
                    ProductName = product.ProductName,
                    ProductDescription = product.ProductDescription,
                    ProductPrice = product.ProductPrice,
                    ProductQuantity = product.ProductQuantity,
                    Categories = product.Categories.Select(x => new CategoryDto
                    {
                        Id = x.Id,
                        CategoryDescription = x.CategoryDescription,
                        CategoryName = x.CategoryName
                    }).ToList()
                });
            }

            return Ok(response);
        }
        [HttpGet]
        [Route("{id:Guid}")]
        public async Task<IActionResult> GetProductId([FromRoute] Guid id)
        {
            var product = await productRepository.GetByIdAsync(id); 

            //Map Domain model to DTO
            if (product is null)
            {
                return NotFound();
            }
            var response = new ProductDto
            {
                Id = product.Id,
                ProductName = product.ProductName,
                ProductDescription = product.ProductDescription,
                ProductPrice = product.ProductPrice,
                ProductQuantity = product.ProductQuantity,
                Categories = product.Categories.Select(x => new CategoryDto
                {
                    Id = x.Id,
                    CategoryDescription = x.CategoryDescription,
                    CategoryName = x.CategoryName
                }).ToList()

            };

            return Ok(response);
        }

        [HttpPut]
        [Route("{id:Guid}")]
        public async Task<IActionResult> EditProduct([FromRoute] Guid id, UpdateProductRequestDto request)
        {
            //category DTO to Domain Model
            var product = new Product
            {
                Id = id,
                ProductName = request.ProductName,
                ProductDescription = request.ProductDescription,
                ProductPrice = request.ProductPrice,
                ProductQuantity = request.ProductQuantity,
                Categories = new List<Category>()
            };
            foreach (var categoryGuid in request.Categories)
            {
                var existingCategory = await categoryRepository.GetById(categoryGuid);
                if (existingCategory is not null)
                {
                    product.Categories.Add(existingCategory);
                }
            }

            var updateProduct = await productRepository.UpdateAsync(product);
            product = await productRepository.UpdateAsync(product);

            if (product == null)
            {
                return NotFound();
            }
            //Convert Domain model to DTO
            var response = new ProductDto
            {
                Id = product.Id,
                ProductName = product.ProductName,
                ProductDescription = product.ProductDescription,
                ProductPrice = product.ProductPrice,
                ProductQuantity = product.ProductQuantity,
                Categories = product.Categories.Select(x => new CategoryDto
                {
                    Id = x.Id,
                    CategoryDescription = x.CategoryDescription,
                    CategoryName = x.CategoryName
                }).ToList()
            };
            return Ok(response);
        }
        [HttpDelete]
        [Route("{id:Guid}")]
        public async Task<IActionResult> DeleteProduct([FromRoute] Guid id)
        {
            var deleteProduct = await productRepository.DeleteAsync(id);
            if (deleteProduct is null)
            {
                return NotFound();
            }

            //convert Domain model to DTO
            var response = new ProductDto
            {
                Id = deleteProduct.Id,
                ProductName = deleteProduct.ProductName,
                ProductDescription = deleteProduct.ProductDescription,
                ProductPrice = deleteProduct.ProductPrice,
                ProductQuantity = deleteProduct.ProductQuantity,

            };
            return Ok(response);
        }
    }
}
