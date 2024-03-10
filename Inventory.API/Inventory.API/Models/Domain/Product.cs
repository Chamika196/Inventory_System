namespace Inventory.API.Models.Domain
{
    public class Product
    {
        public Guid Id { get; set; }    
        public string ProductName { get; set; }
        public string ProductDescription { get; set; }
        public double ProductPrice { get; set; }
        public int ProductQuantity { get; set; }

        public ICollection<Category> Categories { get; set; }
    }
}
