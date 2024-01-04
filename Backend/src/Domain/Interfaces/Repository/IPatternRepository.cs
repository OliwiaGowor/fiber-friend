using Common.Helpers;
using Domain.Entities;

namespace Domain.Interfaces.Repository;

public interface IPatternRepository
{
    void DeletePattern(Guid patternId);
    Guid AddPattern(Pattern pattern, List<Yarn> yarns, List<Tool> tools, List<OtherSupply> otherSupplies, List<CountersGroup> counters, List<MyFile> files, List<Photo> photos);
    IQueryable<Pattern> GetAllPatternsForUser(Guid userId);
    IQueryable<Pattern> GetCommunityPatterns(FilterModel filters, int page, int pageSize);
    Pattern GetPatternById(Guid patternId);
    IQueryable<Pattern> GetPatternsForUser(FilterModel filters, Guid userId, int page, int pageSize);
    IQueryable<Pattern> GetPatternsByTimePeriodForUser(DateTime timePeriodStart, DateTime timePeriodEnd, Guid userId);
    Pattern UpdatePattern(Pattern pattern, List<Yarn> yarns, List<Tool> tools, List<OtherSupply> otherSupplies, List<CountersGroup> counters, List<MyFile> files, List<Photo> photos);
}