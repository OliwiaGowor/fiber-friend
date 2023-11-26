using Application.DTO.CountersGroup;

namespace Application.Interfaces.Services;

public interface ICountersGroupService
{
    Guid AddCountersGroup(NewCountersGroupDto countersGroup);
    List<CountersGroupDto> GetAllCountersGroupsForUser(Guid userId);
    object GetCountersGroupById(Guid countersGroupId);
    List<CountersGroupDto> GetCountersGroupsByProjectId(Guid patternId);
    object UpdateCountersGroup(NewCountersGroupDto newCountersGroup);
    void DeleteCountersGroup(Guid id);
}