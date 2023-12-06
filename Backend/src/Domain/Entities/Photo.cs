namespace Domain.Entities;

public class Photo
{
    public Guid Id { get; set; }
    public string Name { get; set; }
    public string Content { get; set; }
    public Guid ParentId { get; set; }
}