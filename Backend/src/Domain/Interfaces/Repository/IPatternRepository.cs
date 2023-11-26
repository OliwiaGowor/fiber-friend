using Domain.Entities;
using Common.Helpers;

namespace Domain.Interfaces.Repository;

public interface IPatternRepository
{
    void DeletePattern(Guid patternId);
    Guid AddPattern(Pattern pattern, List<Yarn> yarns, List<Tool> tools, List<OtherSupply> otherSupplies);
    IQueryable<Pattern> GetAllPatternsForUser(Guid userId);
    Pattern GetPatternById(Guid patternId);
    public IQueryable<Pattern> GetPatternsForUser(FilterModel filters, Guid userId, int page, int pageSize);
    public IQueryable<Pattern> GetSharedPatterns(FilterModel filters, int page, int pageSize);
    void UpdatePattern(Pattern pattern, List<Yarn> yarns, List<Tool> tools, List<OtherSupply> otherSupplies);
}