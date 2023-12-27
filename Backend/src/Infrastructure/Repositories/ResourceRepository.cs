using Common.Enums;
using Common.Helpers;
using Domain.Entities;
using Domain.Interfaces.Repository;
using Microsoft.EntityFrameworkCore;

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

    public IQueryable<Resource> GetAllResourcesForUser(Guid userId)
    {
        var resources = _dbContext.Resources.Where(i => i.UserId == userId);
        return resources;
    }

    public IQueryable<Resource> GetResourcesForUser(FilterModel filters, Guid userId, int page, int pageSize)
    {
        var query = _dbContext.Resources.AsQueryable();

        if (filters.resourceType is not null)
        {
            query = query.Where(p => p.Type == filters.resourceType);
        }

        var patterns = query.Where(p => p.UserId == userId)
            .Skip((page - 1) * pageSize)
            .Take(pageSize);

        return patterns;
    }

    public IQueryable<Resource> GetAllYarnsForUser(Guid userId)
    {
        var resources = _dbContext.Resources.Where(i => i.UserId == userId && i.Type == ResourceType.Yarn);
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