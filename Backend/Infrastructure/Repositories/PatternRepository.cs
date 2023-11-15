using Domain.Entities;
using Domain.Enums;
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

    public Guid AddPattern(Pattern pattern, List<Yarn> yarns)
    {
        _dbContext.Patterns.Add(pattern);

        foreach (var yarn in yarns)
        {
            yarn.ParentId = pattern.Id;
            _dbContext.Yarns.Add(yarn);
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

    public IQueryable<Pattern> GetAllPatterns()
    {
        var patterns = _dbContext.Patterns;
        return patterns;
    }

    public Pattern GetPatternById(Guid patternId)
    {
        var pattern = _dbContext.Patterns.FirstOrDefault(i => i.Id == patternId);
        return pattern;
    }

    public IQueryable<Pattern> GetPatternsByType(NeedleworkType type)
    {
        var patterns = _dbContext.Patterns.Where(y => y.Type == type);
        return patterns;
    }

    public IQueryable<Pattern> GetPatternsByCategory(string category)
    {
        var patterns = _dbContext.Patterns.Where(y => y.Category == category);
        return patterns;
    }

    public IQueryable<Pattern> GetPatternsByStatus(bool finished)
    {
        var patterns = _dbContext.Patterns.Where(y => y.Finished == finished);
        return patterns;
    }

    public void UpdatePattern(Pattern pattern, List<Yarn> yarns)
    {
        _dbContext.Attach(pattern);
        _dbContext.Entry(pattern).Property("PatternType").IsModified = true;
        _dbContext.Entry(pattern).Property("StartDate").IsModified = true;
        _dbContext.Entry(pattern).Property("EndDate").IsModified = true;
        _dbContext.Entry(pattern).Property("Finished").IsModified = true;
        _dbContext.Entry(pattern).Property("Category").IsModified = true;
        _dbContext.Entry(pattern).Property("Notes").IsModified = true;

        var existingYarns = _dbContext.Yarns.Where(y => y.ParentId == pattern.Id);
        _dbContext.Yarns.RemoveRange(existingYarns);

        foreach (var yarn in yarns)
        {
            _dbContext.Yarns.Add(yarn);
        }


        _dbContext.SaveChanges();
    }
}