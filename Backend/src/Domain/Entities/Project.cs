using Common.Enums;

namespace Domain.Entities;

public class Project
{
    public Guid Id { get; set; }
    public string Name { get; set; }
    public NeedleworkType Type { get; set; }
    public bool IsPlanned { get; set; }
    public DateTime StartDate { get; set; }
    public DateTime? EndDate { get; set; }
    public bool Finished { get; set; }
    public string Category { get; set; }
    public string Notes { get; set; }
    //public ??? List<Photo> Photos { get; set; }
    //public ??? List<File> Files { get; set; }
    public Guid? ConnectedPatternId { get; set; }
    public CommunityPattern? ConnectedCommPattern { get; set; }
    public Pattern? ConnectedPattern { get; set; }
    public Guid UserId { get; set; }
    public ICollection<Yarn> Yarns { get; set; }
    public ICollection<CountersGroup>? Counters { get; set; }

}