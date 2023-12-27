using Common.Helpers;
using Domain.Entities;

namespace Domain.Interfaces.Repository;

public interface IResourceRepository
{
    void DeleteResource(Guid resourceId);
    Guid AddResource(Resource resource);
    IQueryable<Resource> GetAllResourcesForUser(Guid userId);
    public IQueryable<Resource> GetResourcesForUser(FilterModel filters, Guid userId, int page, int pageSize);
    Resource GetResourceById(Guid resourceId);
    void UpdateResource(Resource resource);
}