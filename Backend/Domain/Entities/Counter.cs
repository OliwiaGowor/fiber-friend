namespace Domain.Entities;

public class Counter
{
    public Guid Id { get; set; }
    public string Name { get; set; }
    public int Amount { get; set; }
    public Guid CountersGroupId { get; set; }
}