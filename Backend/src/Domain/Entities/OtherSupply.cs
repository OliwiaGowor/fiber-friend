namespace Domain.Entities;

public class OtherSupply
{
    public Guid Id { get; set; }
    public string Name { get; set; }
    public int Quantity { get; set; }
    public string? Note { get; set; }
    public Guid PatternId { get; set; }
    public Pattern Pattern { get; set; }
}