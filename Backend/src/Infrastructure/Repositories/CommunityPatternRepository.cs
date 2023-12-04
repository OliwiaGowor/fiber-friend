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

        public IQueryable<CommunityPattern> GetAllCommunityPatterns()
        {
            var communityPatterns = _dbContext.CommunityPatterns.AsQueryable();
            return communityPatterns;
        }
        public IQueryable<CommunityPattern> GetCommunityPatterns(FilterModel filters, Guid userId, int page, int pageSize)
        {
            var query = _dbContext.CommunityPatterns.AsQueryable();

            if (filters.Type is not null)
            {
                query = query.Where(p => p.Type == filters.Type);
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
        public IQueryable<CommunityPattern> GetAllCommunityPatternsForUser(Guid userId)
        {
            var userPatterns = _dbContext.UserSavedCommunityPatterns
       .Where(ucp => ucp.UserId == userId)
       .Include(ucp => ucp.CommunityPattern)
       .Select(ucp => ucp.CommunityPattern);

            return userPatterns.AsQueryable();
        }
        public IQueryable<CommunityPattern> GetCommunityPatternsForUser(FilterModel filters, Guid userId, int page, int pageSize)
        {
            var query = _dbContext.CommunityPatterns
                .Where(p => p.SavedByUsers.Any(u => u.UserId == userId))
                .AsQueryable();

            if (filters.Type is not null)
            {
                query = query.Where(p => p.Type == filters.Type);
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
        public CommunityPattern GetCommunityPatternById(Guid patternId)
        {
            var communityPattern = _dbContext.CommunityPatterns.FirstOrDefault(i => i.Id == patternId);
            return communityPattern;
        }
    }
}
