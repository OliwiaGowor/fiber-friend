using Application.DTO.Pattern;
using Application.DTO.Yarn;
using Domain.Enums;

namespace Application.Interfaces.Services;

public interface IPatternService
{
    Guid AddPattern(NewPatternDto pattern, List<NewYarnDto> yarns);
    List<PatternDto> GetPatternsListForUser(Guid userId);
    object GetPatternById(Guid patternId);
    List<PatternDto> GetPatternsByTypeForUser(NeedleworkType type, Guid userId);
    List<PatternDto> GetPatternsByCategoryForUser(string category, Guid userId);
    List<PatternDto> GetPatternsByStatusForUser(bool finished, Guid userId);
    object UpdatePattern(NewPatternDto pattern, List<NewYarnDto> yarns);
    void DeletePattern(Guid id);
}