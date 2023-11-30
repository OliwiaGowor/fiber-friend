using Domain.Entities;
using Domain.Interfaces.Repository;

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
        var countersGroup = _dbContext.CountersGroups.FirstOrDefault(i => i.Id == countersGroupId);
        return countersGroup;
    }

    public IQueryable<CountersGroup> GetAllCountersGroupsForUser(Guid userId)
    {
        var countersGroups = _dbContext.CountersGroups.Where(y => y.UserId == userId);
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