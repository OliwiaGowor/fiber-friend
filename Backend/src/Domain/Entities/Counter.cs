namespace Domain.Entities;

public class Counter
{
    public Guid Id { get; set; }
    public string Name { get; set; }
    public int Value { get; set; }
    public Guid CountersGroupId { get; set; }
    public CountersGroup CountersGroup { get; set; }
}