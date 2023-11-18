using Domain.Entities;
using Domain.Enums;

namespace Domain.Interfaces.Repository;

public interface IPatternRepository
{
    void DeletePattern(Guid patternId);
    Guid AddPattern(Pattern pattern, List<Yarn> yarns);
    IQueryable<Pattern> GetAllPatternsForUser(Guid userId);
    Pattern GetPatternById(Guid patternId);
    IQueryable<Pattern> GetPatternsByTypeForUser(NeedleworkType type, Guid userId);
    IQueryable<Pattern> GetPatternsByCategoryForUser(string category, Guid userId);
    IQueryable<Pattern> GetPatternsByStatusForUser(bool finished, Guid userId);
    void UpdatePattern(Pattern pattern, List<Yarn> yarns);
}