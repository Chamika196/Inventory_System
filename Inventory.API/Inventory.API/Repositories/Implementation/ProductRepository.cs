using Inventory.API.Data;
using Inventory.API.Models.Domain;
using Inventory.API.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Inventory.API.Repositories.Implementation
{
    public class ProductRepository : IProductRepository
    {
        private readonly ApplicationDbContext dbContext;
        public ProductRepository(ApplicationDbContext dbContext)
        {
            this.dbContext = dbContext;
        }
        public async Task<Product> CreateAsync(Product product)
        {
            await dbContext.Products.AddAsync(product);
            await dbContext.SaveChangesAsync();

            return product;
        }

        public async Task<Product?> DeleteAsync(Guid id)
        {
            var existingProduct = await dbContext.Products.FirstOrDefaultAsync(x => x.Id == id);

            if (existingProduct != null)
            {
                dbContext.Products.Remove(existingProduct);
                await dbContext.SaveChangesAsync();
                return existingProduct;

            }
            return null;

        }

        public async Task<IEnumerable<Product>> GetAllAsync()
        {
            return await dbContext.Products.Include(x => x.Categories).ToListAsync();
        }

        public async Task<Product?> GetByIdAsync(Guid id)
        {
            return await dbContext.Products.Include(x => x.Categories).FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<Product?> UpdateAsync(Product product)
        {
            //finding
            var existingProduct = await dbContext.Products.Include(x => x.Categories)
                .FirstOrDefaultAsync(x => x.Id == product.Id);
            

            if (existingProduct == null)
            {

                return null;
            }
            //update product
            dbContext.Entry(existingProduct).CurrentValues.SetValues(product);

            //upadate categories
            existingProduct.Categories = product.Categories;

            await dbContext.SaveChangesAsync();
            return product;
        }
    }
}
