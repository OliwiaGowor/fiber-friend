using Common.Helpers;
using Domain.Entities;

namespace Domain.Interfaces.Repository
{
    public interface ICommunityPatternRepository
    {
        IQueryable<CommunityPattern> GetAllCommunityPatterns();
        IQueryable<CommunityPattern> GetCommunityPatterns(FilterModel filters, Guid userId, int page, int pageSize);
        IQueryable<CommunityPattern> GetAllCommunityPatternsForUser(Guid userId);
        IQueryable<CommunityPattern> GetCommunityPatternsForUser(FilterModel filters, Guid userId, int page, int pageSize);
        CommunityPattern GetCommunityPatternById(Guid patternId);
    }
}
