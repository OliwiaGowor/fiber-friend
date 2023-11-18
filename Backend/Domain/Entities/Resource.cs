using Domain.Enums;

namespace Domain.Entities;

public class Resource
{
    public Guid Id { get; set; }
    public string Name { get; set; }
    public ResourceType Type { get; set; }
    public int Quantity { get; set; }
    public string? Gauge { get; set; }
    public string ToolSize { get; set; }
    public Guid UserId { get; set; }
}