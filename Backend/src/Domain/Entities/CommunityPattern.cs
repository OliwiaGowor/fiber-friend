using System.ComponentModel.DataAnnotations.Schema;

namespace Domain.Entities
{
    [Table("Patterns")]
    public class CommunityPattern : PatternBase
    {
        public ICollection<UserSavedCommunityPattern> SavedByUsers { get; set; }
    }
}
