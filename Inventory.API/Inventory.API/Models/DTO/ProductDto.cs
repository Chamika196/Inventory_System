namespace Inventory.API.Models.DTO
{
    public class ProductDto
    {
        public Guid Id { get; set; }
        public string ProductName { get; set; }
        public string ProductDescription { get; set; }
        public double ProductPrice { get; set; }
        public int ProductQuantity { get; set; }

        public List<CategoryDto> Categories { get; set; } = new List<CategoryDto>();

    }
}
