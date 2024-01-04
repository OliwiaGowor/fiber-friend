using Common.Helpers;
using Domain.Entities;
using Domain.Interfaces.Repository;
using Humanizer.Localisation;
using Infrastructure.Helpers;
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

    public void UpdateCountersGroup(CountersGroup countersGroup, List<Counter> counters)
    {
        var dbCountersGroup = _dbContext.CountersGroups.Include(c => c.Counters)
            .FirstOrDefault(y => y.Id == countersGroup.Id);

        if (dbCountersGroup != null)
        {
            _dbContext.Entry(dbCountersGroup).CurrentValues.SetValues(countersGroup);

            foreach (var counter in counters)
            {
                counter.CountersGroupId = countersGroup.Id;
            }

            RepositoryHelper.UpdateCollection(_dbContext.Counters, dbCountersGroup.Counters, counters, counter => counter.Id);

            _dbContext.SaveChanges();
        }
        else
        {
            throw new Exception("CountersGroup not found");
        }
    }
}