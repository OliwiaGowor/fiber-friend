namespace Domain.Entities
{
    public class CommunityPattern : PatternBase
    {
        public ICollection<User> SavedByUsers { get; set; }
    }
}
