using Application.DTO.Pattern;
using Common.Helpers;

namespace Application.Interfaces.Services;

public interface ICommunityPatternService
{
    List<CommunityPatternDto> GetAllCommunityPatterns();
    List<CommunityPatternDto> GetCommunityPatterns(FilterModel filters, Guid userId, int page, int pageSize);
    List<CommunityPatternDto> GetAllCommunityPatternsForUser(Guid userId);
    List<CommunityPatternDto> GetCommunityPatternsForUser(FilterModel filters, Guid userId, int page, int pageSize);
    object GetCommunityPatternById(Guid patternId);
}