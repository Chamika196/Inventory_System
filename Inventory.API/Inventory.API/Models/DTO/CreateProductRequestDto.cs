namespace Inventory.API.Models.DTO
{
    public class CreateProductRequestDto
    {
        public string ProductName { get; set; }
        public string ProductDescription { get; set; }
        public double ProductPrice { get; set; }
        public int ProductQuantity { get; set; }
        public Guid[] Categories { get; set; }
    }
}
