
namespace Domain.Entities
{
    public class UserSavedCommunityPattern
    {
        public Guid UserId { get; set; }
        public User User { get; set; }
        public Guid CommunityPatternId { get; set; }
        public CommunityPattern CommunityPattern { get; set; }
    }
}
