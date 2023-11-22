namespace Domain.Entities;

public class Yarn
{
    public Guid Id { get; set; }
    public string Name { get; set; }
    public int Quantity { get; set; }
    public string Gauge { get; set; }
    public string Stitch { get; set; }
    public string ToolSize { get; set; }
    public Guid ParentId { get; set; }
}