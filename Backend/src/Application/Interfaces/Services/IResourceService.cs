using Application.DTO.CountersGroup;
using Application.DTO.Resource;
using Common.Helpers;

namespace Application.Interfaces.Services;

public interface IResourceService
{
    Guid AddResource(NewResourceDto resource);
    List<ResourceDto> GetResourcesListForUser(Guid userId);
    object GetResourceById(Guid resourceId);
    public List<ResourceDto> GetResourcesForUser(FilterModel? filters, Guid userId, int page, int pageSize);
    object UpdateResource(NewResourceDto resource);
    void DeleteResource(Guid id);
}