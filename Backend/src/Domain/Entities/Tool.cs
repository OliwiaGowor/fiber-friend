namespace Domain.Entities;

public class Tool
{
    public Guid Id { get; set; }
    public string Name { get; set; }
    public int Quantity { get; set; }
    public string? Size { get; set; }
    public Guid PatternId { get; set; }
    public PatternBase Pattern { get; set; }
}