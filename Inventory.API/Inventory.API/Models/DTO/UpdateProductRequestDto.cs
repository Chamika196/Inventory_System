namespace Inventory.API.Models.DTO
{
    public class UpdateProductRequestDto
    {
        public string ProductName { get; set; }
        public string ProductDescription { get; set; }
        public double ProductPrice { get; set; }
        public int ProductQuantity { get; set; }
        public List<Guid> Categories { get; set; } = new List<Guid>();
    }
}
