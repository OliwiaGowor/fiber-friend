using Common.Helpers;
using Domain.Entities;

namespace Domain.Interfaces.Repository;

public interface ICountersGroupRepository
{
    void DeleteCountersGroup(Guid countersGroupId);
    Guid AddCountersGroup(CountersGroup countersGroup);
    IQueryable<CountersGroup> GetAllCountersGroupsForUser(Guid userId);
    public IQueryable<CountersGroup> GetCountersGroupsForUser(FilterModel filters, Guid userId, int page, int pageSize);
    CountersGroup GetCountersGroupById(Guid countersGroupId);
    IQueryable<CountersGroup> GetCountersGroupsByProjectId(Guid countersGroupd);
    void UpdateCountersGroup(CountersGroup countersGroup, List<Counter> counters);
}