using Domain.Entities;

namespace Domain.Interfaces.Repository;

public interface IPatternRepository
{
    void DeletePattern(Guid patternId);
    Guid AddPattern(Pattern pattern);
    IQueryable<Pattern> GetAllPatterns();
    Pattern GetPatternById(Guid patternId);
    void UpdatePattern(Pattern pattern);
}