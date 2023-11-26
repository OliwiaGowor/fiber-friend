using Domain.Entities;

namespace Domain.Interfaces.Repository;

public interface IResourceRepository
{
    void DeleteResource(Guid resourceId);
    Guid AddResource(Resource resource);
    IQueryable<Resource> GetAllResourcesForUser(Guid userId);
    IQueryable<Resource> GetAllYarnsForUser(Guid userId);
    Resource GetResourceById(Guid resourceId);
    void UpdateResource(Resource resource);
}