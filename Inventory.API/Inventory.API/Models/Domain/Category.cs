namespace Inventory.API.Models.Domain
{
    public class Category
    {
        public Guid Id { get; set; }
        public string CategoryName { get; set; }
        public string CategoryDescription { get; set; }
        public ICollection<Product> products { get; set; }
    }
}
