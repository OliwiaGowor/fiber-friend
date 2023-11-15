using Application.DTO.Resource;

namespace Application.Interfaces.Services;

public interface IResourceService
{
    Guid AddResource(NewResourceDto resource);
    List<ResourceDto> GetResourcesList();
    object GetResourceById(Guid resourceId);
    object UpdateResource(NewResourceDto resource);
    void DeleteResource(Guid id);
}