namespace Domain.Entities;

public class OtherSupply
{
    public Guid Id { get; set; }
    public string Name { get; set; }
    public int Quantity { get; set; }
    public string? Note { get; set; }
    public Guid ParentId { get; set; }
    public Project Parent { get; set; }
}