using Common.Enums;

namespace Domain.Entities;

public class Resource
{
    public Guid Id { get; set; }
    public string Name { get; set; }
    public ResourceType Type { get; set; }
    public int Quantity { get; set; }
    public string? Gauge { get; set; }
    public string? SkeinWeight { get; set; }
    public string? SkeinLenght { get; set; }
    public string ToolSize { get; set; }
    public string? ToolType { get; set; }
    public string? Notes { get; set; }
    public Guid UserId { get; set; }
}