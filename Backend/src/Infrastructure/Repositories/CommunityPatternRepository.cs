using Common.Helpers;
using Domain.Entities;
using Domain.Interfaces.Repository;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repositories
{
    public class CommunityPatternRepository : ICommunityPatternRepository
    {
        private readonly ApplicationDbContext _dbContext;

        public CommunityPatternRepository(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public IQueryable<Pattern> GetAllCommunityPatterns()
        {
            var communityPatterns = _dbContext.Patterns.AsQueryable();
            return communityPatterns;
        }

        public IQueryable<Pattern> GetCommunityPatterns(FilterModel filters, int page, int pageSize)
        {
            var query = _dbContext.Patterns.AsQueryable();

            if (filters.needleworkType is not null)
            {
                query = query.Where(p => p.Type == filters.needleworkType);
            }

            if (filters.category is not null)
            {
                query = query.Where(p => p.Category == filters.category);
            }

            var communityPatterns = query.Include(p => p.Yarns)
                .Include(p => p.Tools)
                .Include(p => p.OtherSupplies)
                .Include(p => p.Photos)
                .Skip((page - 1) * pageSize)
                .Take(pageSize);

            return communityPatterns;
        }
        public IQueryable<Pattern> GetAllCommunityPatternsForUser(Guid userId)
        {
            var userPatterns = _dbContext.UserSavedCommunityPatterns
                .Where(ucp => ucp.UserId == userId)
                .Include(ucp => ucp.CommunityPattern)
                .Select(ucp => ucp.CommunityPattern);

            return userPatterns.AsQueryable();
        }
        public IQueryable<Pattern> GetCommunityPatternsForUser(FilterModel filters, Guid userId, int page, int pageSize)
        {
            var query = _dbContext.Patterns
                .Where(p => p.SavedByUsers.Any(u => u.UserId == userId))
                .AsQueryable();

            if (filters.needleworkType is not null)
            {
                query = query.Where(p => p.Type == filters.needleworkType);
            }

            if (filters.category is not null)
            {
                query = query.Where(p => p.Category == filters.category);
            }

            var communityPatterns = query.Where(p => p.AuthorId == userId)
                .Skip((page - 1) * pageSize)
                .Take(pageSize);

            return communityPatterns;
        }
        public Pattern GetCommunityPatternById(Guid patternId)
        {
            var communityPattern = _dbContext.Patterns.FirstOrDefault(i => i.Id == patternId);
            return communityPattern;
        }
    }
}
