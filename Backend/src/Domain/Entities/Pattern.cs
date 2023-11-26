using Common.Enums;

namespace Domain.Entities
{
    public class Pattern
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public NeedleworkType Type { get; set; }
        public bool IsAuthorial { get; set; }
        public string Category { get; set; }
        public string Notes { get; set; }
        //public ??? List<Photo> Photos { get; set; }
        //public ??? List<File> Files { get; set; }
        public Guid UserId { get; set; }
        public User User { get; set; }
        public List<Yarn> Yarns { get; set; }
        public List<Tool> Tools { get; set; }
        public List<OtherSupply>? OtherSupplies { get; set; }
        public bool IsShared { get; set; }
    }
}
