using Application.DTO.Counter;
using Application.DTO.CountersGroup;
using Application.DTO.Pattern;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Common.Helpers;
using Domain.Entities;
using Domain.Interfaces.Repository;

namespace Application.Interfaces.Services;

public class CountersGroupService : ICountersGroupService
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
        var countersEntity = _mapper.Map<List<Counter>>(countersGroup.Counters);
        var countersGroupEnity = _mapper.Map<CountersGroup>(countersGroup);
        countersGroupEnity.Counters = countersEntity;

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

    public List<CountersGroupDto> GetCountersGroupsForUser(FilterModel? filters, Guid userId, int page, int pageSize)
    {
        var countersGroups = _countersGroupRepo.GetCountersGroupsForUser(filters, userId, page, pageSize)
            .ProjectTo<CountersGroupDto>(_mapper.ConfigurationProvider)
            .ToList();

        return countersGroups;
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
        var counters = _mapper.Map<List<Counter>>(newCountersGroup.Counters);

        _countersGroupRepo.UpdateCountersGroup(countersGroup, counters);

        return countersGroup;
    }

    public void DeleteCountersGroup(Guid id)
    {
        _countersGroupRepo.DeleteCountersGroup(id);
    }
}