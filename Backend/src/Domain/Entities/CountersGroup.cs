namespace Domain.Entities;

public class CountersGroup
{
    public Guid Id { get; set; }
    public string Name { get; set; }
    public Guid UserId { get; set; }
    public User User { get; set; }
    public ICollection<Counter> Counters { get; set; }
    public Guid? PatternId { get; set; }
    public PatternBase? Pattern { get; set; }
    public Guid? ProjectId { get; set; }
    public Project? Project { get; set; }
}