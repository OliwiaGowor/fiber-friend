using Application.DTO.CountersGroup;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain.Entities;
using Domain.Interfaces.Repository;

namespace Application.Interfaces.Services;

public class CountersGroupService
{
    private readonly IMapper _mapper;
    private readonly ICountersGroupRepository _countersGroupRepo;

    public CountersGroupService(ICountersGroupRepository countersGroupRepo, IMapper mapper)
    {
        _countersGroupRepo = countersGroupRepo;
        _mapper = mapper;
    }

    public Guid AddCountersGroup(NewCountersGroupDto countersGroup)
    {
        var countersGroupEnity = _mapper.Map<CountersGroup>(countersGroup);

        var id = _countersGroupRepo.AddCountersGroup(countersGroupEnity);

        return id;
    }

    public List<CountersGroupDto> GetAllCountersGroupsForUser(Guid userId)
    {
        var countersGroup = _countersGroupRepo.GetAllCountersGroupsForUser(userId)
                    .ProjectTo<CountersGroupDto>(_mapper.ConfigurationProvider)
                    .ToList();

        return countersGroup;
    }

    public object GetCountersGroupById(Guid countersGroupId)
    {
        var countersGroup = _countersGroupRepo.GetCountersGroupById(countersGroupId);
        var countersGroupDto = _mapper.Map<CountersGroupDto>(countersGroup);

        return countersGroupDto;
    }

    public List<CountersGroupDto> GetCountersGroupsByProjectId(Guid countersGroupId)
    {
        var countersGroup = _countersGroupRepo.GetCountersGroupsByProjectId(countersGroupId)
                    .ProjectTo<CountersGroupDto>(_mapper.ConfigurationProvider)
                    .ToList();

        return countersGroup;
    }

    public object UpdateCountersGroup(NewCountersGroupDto newCountersGroup)
    {
        var countersGroup = _mapper.Map<CountersGroup>(newCountersGroup);

        _countersGroupRepo.UpdateCountersGroup(countersGroup);

        return countersGroup;
    }

    public void DeleteCountersGroup(Guid id)
    {
        _countersGroupRepo.DeleteCountersGroup(id);
    }
}