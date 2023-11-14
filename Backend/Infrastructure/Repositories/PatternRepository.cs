using Domain.Entities;
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

    public Guid AddPattern(Pattern pattern)
    {

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

    public void UpdatePattern(Pattern service)
    {
        _dbContext.Attach(service);
        _dbContext.Entry(service).Property("ype").IsModified = true;
        _dbContext.Entry(service).Property("StartDate").IsModified = true;
        _dbContext.Entry(service).Property("EndDate").IsModified = true;
        _dbContext.Entry(service).Property("Status").IsModified = true;
        _dbContext.Entry(service).Property("PaymentStatus").IsModified = true;
        _dbContext.Entry(service).Property("City").IsModified = true;
        _dbContext.Entry(service).Property("Price").IsModified = true;

        var oldMaterials = _dbContext.Yarns.Where(m => m.Id == service.Id).ToList();
        
        _dbContext.SaveChanges();
    }
}