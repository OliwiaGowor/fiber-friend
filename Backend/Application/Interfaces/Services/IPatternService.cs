using Application.DTO.Pattern;

namespace Application.Interfaces.Services;

public interface IPatternService
{
    Guid AddPattern(PatternDto pattern);
    List<PatternDto> GetPatternsList();
    object GetPatternById(Guid patternId);
    object UpdatePattern(PatternDto pattern);
    void DeletePattern(Guid id);
}