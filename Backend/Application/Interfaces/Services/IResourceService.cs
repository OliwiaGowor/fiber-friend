using Application.DTO.Resource;

namespace Application.Interfaces.Services;

public interface IResourceService
{
    Guid AddResource(NewResourceDto resource);
    List<ResourceDto> GetResourcesListForUser(Guid userId);
    object GetResourceById(Guid resourceId);
    List<ResourceDto> GetYarnsListForUser(Guid userId);
    object UpdateResource(NewResourceDto resource);
    void DeleteResource(Guid id);
}