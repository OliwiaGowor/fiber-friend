namespace Domain.Entities;

public class MyFile
{
    public Guid Id { get; set; }
    public string Name { get; set; }
    public string Content { get; set; }
    public string Type { get; set; }
    public Guid ParentId { get; set; }
}