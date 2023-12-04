using Application.DTO.Pattern;
using Common.Helpers;

namespace Application.Interfaces.Services;

public interface IPatternService
{
    Guid AddPattern(NewPatternDto pattern);
    List<PatternDto> GetPatternsListForUser(Guid userId);
    object GetPatternById(Guid patternId);
    public List<PatternDto> GetPatternsForUser(FilterModel filters, Guid userId, int page, int pageSize);
    List<PatternDto> GetPatternsByTimePeriodForUser(DateTime timePeriodStart, DateTime timePeriodEnd, Guid userId);
    object UpdatePattern(NewPatternDto pattern);
    void DeletePattern(Guid id);
}