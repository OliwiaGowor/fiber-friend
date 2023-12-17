using Common.Helpers;
using Domain.Entities;

namespace Domain.Interfaces.Repository
{
    public interface ICommunityPatternRepository
    {
        IQueryable<Pattern> GetAllCommunityPatterns();
        IQueryable<Pattern> GetCommunityPatterns(FilterModel filters, int page, int pageSize);
        IQueryable<Pattern> GetAllCommunityPatternsForUser(Guid userId);
        IQueryable<Pattern> GetCommunityPatternsForUser(FilterModel filters, Guid userId, int page, int pageSize);
        Pattern GetCommunityPatternById(Guid patternId);
    }
}
