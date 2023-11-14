using Application.DTO.Resource;

namespace Application.Interfaces.Services;

public interface IResourceService
{
    Guid AddResource(ResourceDto resource);
    List<ResourceDto> GetResourcesList();
    object GetResourceById(Guid resourceId);
    object UpdateResource(ResourceDto resource);
    void DeleteResource(Guid id);
}