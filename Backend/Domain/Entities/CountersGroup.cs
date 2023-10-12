namespace Domain.Entities;

public class CountersGroup
{
    public Guid Id { get; set; }
    public string Name { get; set; }
    public List<Counter> Counters { get; set; }
}