using Domain.Entities;
using Domain.Enums;

namespace Domain.Interfaces.Repository;

public interface IPatternRepository
{
    void DeletePattern(Guid patternId);
    Guid AddPattern(Pattern pattern, List<Yarn> yarns);
    IQueryable<Pattern> GetAllPatterns();
    Pattern GetPatternById(Guid patternId);
    IQueryable<Pattern> GetPatternsByType(NeedleworkType type);
    IQueryable<Pattern> GetPatternsByCategory(string category);
    IQueryable<Pattern> GetPatternsByStatus(bool finished);
    void UpdatePattern(Pattern pattern, List<Yarn> yarns);
}