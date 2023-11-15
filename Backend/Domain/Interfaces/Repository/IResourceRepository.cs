using Domain.Entities;

namespace Domain.Interfaces.Repository;

public interface IResourceRepository
{
    void DeleteResource(Guid resourceId);
    Guid AddResource(Resource resource);
    IQueryable<Resource> GetAllResources();
    Resource GetResourceById(Guid resourceId);
    void UpdateResource(Resource resource);
}