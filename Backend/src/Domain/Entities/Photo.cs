namespace Domain.Entities;

public class Photo
{
    public Guid Id { get; set; }
    public string Name { get; set; }
    public string Content { get; set; }
    public string Type { get; set; }
    public Guid? PatternId { get; set; }
    public Pattern? Pattern { get; set; }
    public Guid? ProjectId { get; set; }
    public Project? Project { get; set; }
    public Guid? ResourceId { get; set; }
    public Resource? Resource { get; set; }
}