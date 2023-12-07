using Common.Helpers;
using Domain.Entities;
using Domain.Interfaces.Repository;
using Infrastructure.Helpers;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repositories;
public class PatternRepository : IPatternRepository
{
    private readonly ApplicationDbContext _dbContext;

    public PatternRepository(ApplicationDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public Guid AddPattern(Pattern pattern, List<Yarn> yarns, List<Tool> tools, List<OtherSupply> otherSupplies, List<MyFile> files, List<Photo> photos)
    {
        if (!_dbContext.Users.Any(u => u.Id == pattern.AuthorId)) throw new Exception("User not found");

        _dbContext.Patterns.Add(pattern);

        foreach (var yarn in yarns)
        {
            yarn.PatternId = pattern.Id;
            _dbContext.Yarns.Add(yarn);
        }

        foreach (var tool in tools)
        {
            tool.PatternId = pattern.Id;
            _dbContext.Tools.Add(tool);
        }

        foreach (var otherSupply in otherSupplies)
        {
            otherSupply.PatternId = pattern.Id;
            _dbContext.OtherSupplies.Add(otherSupply);
        }

        foreach (var file in files)
        {
            file.PatternId = pattern.Id;
            _dbContext.Files.Add(file);
        }

        foreach (var photo in photos)
        {
            photo.PatternId = pattern.Id;
            _dbContext.Photos.Add(photo);
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
        var patterns = _dbContext.Patterns.Where(y => y.AuthorId == userId);
        return patterns;
    }

    public Pattern GetPatternById(Guid patternId)
    {
        var pattern = _dbContext.Patterns.Include(p => p.Yarns)
            .Include(p => p.Tools)
            .Include(p => p.OtherSupplies)
            .Include(p => p.Photos)
            .Include(p => p.Files)
            .FirstOrDefault(i => i.Id == patternId);
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

        var patterns = query.Include(p => p.Yarns)
            .Include(p => p.Tools)
            .Include(p => p.OtherSupplies)
            .Include(p => p.Photos)
            .Include(p => p.Files)
            .Where(p => p.AuthorId == userId)
            .Skip((page - 1) * pageSize)
            .Take(pageSize);

        return patterns;
    }
    public IQueryable<Pattern> GetPatternsByTimePeriodForUser(DateTime timePeriodStart, DateTime timePeriodEnd, Guid userId)
    {
        var patterns = _dbContext.Patterns.Where(
            y => y.AuthorId == userId &&
            y.IsAuthorial == true &&
            y.StartDate >= timePeriodStart &&
            y.EndDate <= timePeriodEnd
            );
        return patterns;
    }

    public Pattern UpdatePattern(
        Pattern pattern,
        List<Yarn> yarns,
        List<Tool> tools,
        List<OtherSupply> otherSupplies,
        List<CountersGroup> counters,
        List<MyFile> files,
        List<Photo> photos
        )
    {
        var dbPattern = _dbContext.Patterns
         .Include(p => p.Yarns)
         .Include(p => p.Tools)
         .Include(p => p.OtherSupplies)
         .Include(p => p.Counters)
         .Include(p => p.Files)
         .Include(p => p.Photos)
         .FirstOrDefault(y => y.Id == pattern.Id);

        if (dbPattern != null)
        {
            _dbContext.Entry(dbPattern).CurrentValues.SetValues(pattern);

            RepositoryHelper.UpdateCollection(_dbContext.Yarns, dbPattern.Yarns, yarns);
            RepositoryHelper.UpdateCollection(_dbContext.Tools, dbPattern.Tools, tools);
            RepositoryHelper.UpdateCollection(_dbContext.OtherSupplies, dbPattern.OtherSupplies, otherSupplies);
            RepositoryHelper.UpdateCollection(_dbContext.CountersGroups, dbPattern.Counters, counters);
            RepositoryHelper.UpdateCollection(_dbContext.Files, dbPattern.Files, files);
            RepositoryHelper.UpdateCollection(_dbContext.Photos, dbPattern.Photos, photos);

            _dbContext.SaveChanges();

            return dbPattern;
        }
        else
        {
            throw new Exception("Pattern not found");
        }
    }
}