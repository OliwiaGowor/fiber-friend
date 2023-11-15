using Domain.Entities;
using Domain.Interfaces.Repository;

namespace Infrastructure.Repositories;
//TODO: implement
public class ResourceRepository : IResourceRepository
{
    private readonly ApplicationDbContext _dbContext;

    public ResourceRepository(ApplicationDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public Guid AddResource(Resource resource)
    {
        _dbContext.Resources.Add(resource);

        _dbContext.SaveChanges();
        return resource.Id;
    }

    public void DeleteResource(Guid resourceId)
    {
        var resource = _dbContext.Resources.Find(resourceId);
        if (resource is not null)
        {
            _dbContext.Resources.Remove(resource);
            _dbContext.SaveChanges();
        }
    }

    public IQueryable<Resource> GetAllResources()
    {
        var resources = _dbContext.Resources;
        return resources;
    }

    public Resource GetResourceById(Guid resourceId)
    {
        var resource = _dbContext.Resources.FirstOrDefault(i => i.Id == resourceId);
        return resource;
    }

    public void UpdateResource(Resource resource)
    {
        _dbContext.Attach(resource);
        _dbContext.Entry(resource).Property("ResourceType").IsModified = true;
        _dbContext.Entry(resource).Property("StartDate").IsModified = true;
        _dbContext.Entry(resource).Property("EndDate").IsModified = true;
        _dbContext.Entry(resource).Property("Finished").IsModified = true;
        _dbContext.Entry(resource).Property("Category").IsModified = true;
        _dbContext.Entry(resource).Property("Notes").IsModified = true;

        _dbContext.SaveChanges();
    }
}