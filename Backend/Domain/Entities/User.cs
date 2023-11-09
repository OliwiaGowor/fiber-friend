namespace Domain.Entities;

public class User
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public string Username { get; set; } = null!;
    public string Email { get; set; } = null!;
    public string HashedPassword { get; set; } = null!;
    public List<Pattern> Patterns { get; set; }
    public List<Project> Projects { get; set; }
    public List<CountersGroup> Counters { get; set; }
}