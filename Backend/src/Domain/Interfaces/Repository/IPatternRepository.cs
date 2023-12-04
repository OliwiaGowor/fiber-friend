using Common.Helpers;
using Domain.Entities;

namespace Domain.Interfaces.Repository;

public interface IPatternRepository
{
    void DeletePattern(Guid patternId);
    Guid AddPattern(Pattern pattern, List<Yarn> yarns, List<Tool> tools, List<OtherSupply> otherSupplies);
    IQueryable<Pattern> GetAllPatternsForUser(Guid userId);
    Pattern GetPatternById(Guid patternId);
    IQueryable<Pattern> GetPatternsForUser(FilterModel filters, Guid userId, int page, int pageSize);
    IQueryable<Pattern> GetPatternsByTimePeriodForUser(DateTime timePeriodStart, DateTime timePeriodEnd, Guid userId);
    void UpdatePattern(Pattern pattern, List<Yarn> yarns, List<Tool> tools, List<OtherSupply> otherSupplies);
}