using Common.Helpers;
using Domain.Entities;
using Domain.Interfaces.Repository;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repositories;

public class CountersGroupRepository : ICountersGroupRepository
{
    private readonly ApplicationDbContext _dbContext;

    public CountersGroupRepository(ApplicationDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public CountersGroup GetCountersGroupById(Guid countersGroupId)
    {
        var countersGroup = _dbContext.CountersGroups.Include(c => c.Counters)
            .Include(c => c.Project)
            .Include(c => c.Pattern)
            .FirstOrDefault(i => i.Id == countersGroupId);
        return countersGroup;
    }

    public IQueryable<CountersGroup> GetAllCountersGroupsForUser(Guid userId)
    {
        var countersGroups = _dbContext.CountersGroups.Where(y => y.UserId == userId);
        return countersGroups;
    }

    public IQueryable<CountersGroup> GetCountersGroupsForUser(FilterModel filters, Guid userId, int page, int pageSize)
    {
        var query = _dbContext.CountersGroups.AsQueryable();

        var countersGroups = query.Include(p => p.Counters)
            .Where(p => p.UserId == userId)
            .Skip((page - 1) * pageSize)
            .Take(pageSize);

        return countersGroups;
    }

    public IQueryable<CountersGroup> GetCountersGroupsByProjectId(Guid projectId)
    {
        var countersGroups = _dbContext.CountersGroups.Where(y => y.ProjectId == projectId);
        return countersGroups;
    }

    public Guid AddCountersGroup(CountersGroup countersGroup)
    {
        _dbContext.CountersGroups.Add(countersGroup);

        foreach (var counter in countersGroup.Counters)
        {
            counter.CountersGroupId = countersGroup.Id;
            _dbContext.Counters.Add(counter);
        }
        _dbContext.SaveChanges();
        return countersGroup.Id;
    }

    public void DeleteCountersGroup(Guid countersGroupId)
    {
        var countersGroup = _dbContext.CountersGroups.Find(countersGroupId);
        if (countersGroup is not null)
        {
            _dbContext.CountersGroups.Remove(countersGroup);
            _dbContext.SaveChanges();
        }
    }

    public void UpdateCountersGroup(CountersGroup countersGroup)
    {
        _dbContext.Attach(countersGroup);
        _dbContext.Entry(countersGroup).Property("CountersGroupType").IsModified = true;
        _dbContext.Entry(countersGroup).Property("StartDate").IsModified = true;
        _dbContext.Entry(countersGroup).Property("EndDate").IsModified = true;
        _dbContext.Entry(countersGroup).Property("Finished").IsModified = true;
        _dbContext.Entry(countersGroup).Property("Category").IsModified = true;
        _dbContext.Entry(countersGroup).Property("Notes").IsModified = true;

        _dbContext.SaveChanges();
    }
}