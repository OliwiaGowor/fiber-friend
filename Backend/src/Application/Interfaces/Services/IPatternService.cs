using Application.DTO.Pattern;
using Common.Helpers;

namespace Application.Interfaces.Services;

public interface IPatternService
{
    Guid AddPattern(NewPatternDto pattern);
    List<PatternDto> GetPatternsListForUser(Guid userId);
    object GetPatternById(Guid patternId);
    public List<PatternDto> GetPatternsForUser(FilterModel filters, Guid userId, int page, int pageSize);
    public List<PatternDto> GetSharedPatterns(FilterModel filters, int page, int pageSize);
    object UpdatePattern(NewPatternDto pattern);
    void DeletePattern(Guid id);
}