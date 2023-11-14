namespace Domain.Entities;

public class Tool
{
    public Guid Id { get; set; }
    public string Type { get; set; }
    public int Quantity { get; set; }
    public string? Size { get; set; }
    public Guid ParentId { get; set; }
    public Project Parent { get; set; }
}