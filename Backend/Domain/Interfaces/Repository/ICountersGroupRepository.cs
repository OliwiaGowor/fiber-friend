using Domain.Entities;
using Domain.Enums;

namespace Domain.Interfaces.Repository;

public interface ICountersGroupRepository
{
    void DeleteCountersGroup(Guid countersGroupId);
    Guid AddCountersGroup(CountersGroup countersGroup);
    IQueryable<CountersGroup> GetAllCountersGroupsForUser(Guid userId);
    CountersGroup GetCountersGroupById(Guid countersGroupId);
    IQueryable<CountersGroup> GetCountersGroupsByProjectId(Guid countersGroupd);
    void UpdateCountersGroup(CountersGroup countersGroup);
}