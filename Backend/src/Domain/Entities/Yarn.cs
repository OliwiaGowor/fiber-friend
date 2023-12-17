namespace Domain.Entities;

public class Yarn
{
    public Guid Id { get; set; }
    public string Name { get; set; }
    public int Quantity { get; set; }
    public string Gauge { get; set; }
    public string Stitch { get; set; }
    public string ToolSize { get; set; }
    // Foreign key to Pattern
    public Guid? PatternId { get; set; }
    public Pattern? Pattern { get; set; }

    // Foreign key to Project
    public Guid? ProjectId { get; set; }
    public Project? Project { get; set; }
}