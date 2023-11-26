using Common.Helpers;
using Domain.Entities;
using Common.Enums;
using Domain.Interfaces.Repository;

namespace Infrastructure.Repositories;
//TODO: implement
public class PatternRepository : IPatternRepository
{
    private readonly ApplicationDbContext _dbContext;

    public PatternRepository(ApplicationDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public Guid AddPattern(Pattern pattern, List<Yarn> yarns, List<Tool> tools, List<OtherSupply> otherSupplies)
    {
        _dbContext.Patterns.Add(pattern);

        foreach (var yarn in yarns)
        {
            yarn.ParentId = pattern.Id;
            _dbContext.Yarns.Add(yarn);
        }

        foreach (var tool in tools)
        {
            tool.ParentId = pattern.Id;
            _dbContext.Tools.Add(tool);
        }

        foreach (var otherSupply in otherSupplies)
        {
            otherSupply.ParentId = pattern.Id;
            _dbContext.OtherSupplies.Add(otherSupply);
        }

        _dbContext.SaveChanges();
        return pattern.Id;
    }

    public void DeletePattern(Guid patternId)
    {
        var pattern = _dbContext.Patterns.Find(patternId);
        if (pattern is not null)
        {
            _dbContext.Patterns.Remove(pattern);
            _dbContext.SaveChanges();
        }
    }

    public IQueryable<Pattern> GetAllPatternsForUser(Guid userId)
    {
        var patterns = _dbContext.Patterns.Where(y => y.UserId == userId);
        return patterns;
    }

    public Pattern GetPatternById(Guid patternId)
    {
        var pattern = _dbContext.Patterns.FirstOrDefault(i => i.Id == patternId);
        return pattern;
    }

    public IQueryable<Pattern> GetPatternsForUser(FilterModel filters, Guid userId, int page, int pageSize)
    {
        var query = _dbContext.Patterns.AsQueryable();

        if (filters.Type is not null)
        {
            query = query.Where(p => p.Type == filters.Type);
        }

        if (filters.category is not null)
        {
            query = query.Where(p => p.Category == filters.category);
        }

        if (filters.isAuthorial is not null)
        {
            query = query.Where(p => p.IsAuthorial == filters.isAuthorial);
        }

        var patterns = query.Where(p => p.UserId == userId)
            .Skip((page - 1) * pageSize)
            .Take(pageSize);

        return patterns;
    }

    public IQueryable<Pattern> GetSharedPatterns(FilterModel filters, int page, int pageSize)
    {
        var query = _dbContext.Patterns.AsQueryable();

        if (filters.Type is not null)
        {
            query = query.Where(p => p.Type == filters.Type);
        }

        if (filters.category is not null)
        {
            query = query.Where(p => p.Category == filters.category);
        }

        if (filters.isAuthorial is not null)
        {
            query = query.Where(p => p.IsAuthorial == filters.isAuthorial);
        }

        var patterns = query.Where(p => p.IsShared == true)
            .Skip((page - 1) * pageSize)
            .Take(pageSize);

        return patterns;
    }

    public void UpdatePattern(Pattern pattern, List<Yarn> yarns, List<Tool> tools, List<OtherSupply> otherSupplies)
    {
        _dbContext.Attach(pattern);
        _dbContext.Entry(pattern).Property("PatternType").IsModified = true;
        _dbContext.Entry(pattern).Property("IsAuthorial").IsModified = true;
        _dbContext.Entry(pattern).Property("Category").IsModified = true;
        _dbContext.Entry(pattern).Property("Notes").IsModified = true;

        var existingYarns = _dbContext.Yarns.Where(y => y.ParentId == pattern.Id);
        _dbContext.Yarns.RemoveRange(existingYarns);

        foreach (var yarn in yarns)
        {
            _dbContext.Yarns.Add(yarn);
        }

        var existingTools = _dbContext.Tools.Where(y => y.ParentId == pattern.Id);
        _dbContext.Tools.RemoveRange(existingTools);

        foreach (var tool in tools)
        {
            _dbContext.Tools.Add(tool);
        }

        var existingOtherSupplies = _dbContext.OtherSupplies.Where(y => y.ParentId == pattern.Id);
        _dbContext.OtherSupplies.RemoveRange(existingOtherSupplies);

        foreach (var otherSupply in otherSupplies)
        {
            _dbContext.OtherSupplies.Add(otherSupply);
        }


        _dbContext.SaveChanges();
    }
}