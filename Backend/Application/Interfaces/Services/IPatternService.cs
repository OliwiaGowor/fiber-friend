using Application.DTO.Pattern;
using Application.DTO.Yarn;
using Domain.Enums;

namespace Application.Interfaces.Services;

public interface IPatternService
{
    Guid AddPattern(NewPatternDto pattern, List<NewYarnDto> yarns);
    List<PatternDto> GetPatternsList();
    object GetPatternById(Guid patternId);
    List<PatternDto> GetPatternsByType(NeedleworkType type);
    List<PatternDto> GetPatternsByCategory(string category);
    List<PatternDto> GetPatternsByStatus(bool finished);
    object UpdatePattern(NewPatternDto pattern, List<NewYarnDto> yarns);
    void DeletePattern(Guid id);
}