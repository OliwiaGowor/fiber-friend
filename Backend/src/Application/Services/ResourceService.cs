using Application.DTO.Resource;
using Application.Interfaces.Services;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain.Entities;
using Domain.Interfaces.Repository;

namespace Application.Services;

internal class ResourceService : IResourceService
{
    private readonly IMapper _mapper;
    private readonly IResourceRepository _resourceRepo;

    public ResourceService(IResourceRepository resourceRepo, IMapper mapper)
    {
        _resourceRepo = resourceRepo;
        _mapper = mapper;
    }

    public Guid AddResource(NewResourceDto resource)
    {
        var resourceEnity = _mapper.Map<Resource>(resource);

        var id = _resourceRepo.AddResource(resourceEnity);

        return id;
    }

    public void DeleteResource(Guid resourceId)
    {
        _resourceRepo.DeleteResource(resourceId);
    }

    public object GetResourceById(Guid resourceId)
    {
        var resource = _resourceRepo.GetResourceById(resourceId);
        var resourceDto = _mapper.Map<ResourceDto>(resource);

        return resourceDto;
    }

    public List<ResourceDto> GetResourcesListForUser(Guid userId)
    {
        var resources = _resourceRepo.GetAllResourcesForUser(userId)
            .ProjectTo<ResourceDto>(_mapper.ConfigurationProvider)
            .ToList();

        return resources;
    }

        public List<ResourceDto> GetYarnsListForUser(Guid userId)
    {
        var yarns = _resourceRepo.GetAllYarnsForUser(userId)
            .ProjectTo<ResourceDto>(_mapper.ConfigurationProvider)
            .ToList();

        return yarns;
    }

    public object UpdateResource(NewResourceDto newResource)
    {
        var resource = _mapper.Map<Resource>(newResource);

        _resourceRepo.UpdateResource(resource);

        return resource;
    }
}