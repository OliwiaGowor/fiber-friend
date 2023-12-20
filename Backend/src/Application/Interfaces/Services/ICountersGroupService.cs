using Application.DTO.CountersGroup;
using Common.Helpers;

namespace Application.Interfaces.Services;

public interface ICountersGroupService
{
    Guid AddCountersGroup(NewCountersGroupDto countersGroup);
    List<CountersGroupDto> GetAllCountersGroupsForUser(Guid userId);
    public List<CountersGroupDto> GetCountersGroupsForUser(FilterModel? filters, Guid userId, int page, int pageSize);
    object GetCountersGroupById(Guid countersGroupId);
    List<CountersGroupDto> GetCountersGroupsByProjectId(Guid patternId);
    object UpdateCountersGroup(NewCountersGroupDto newCountersGroup);
    void DeleteCountersGroup(Guid id);
}