using Domain.Entities;
using Domain.Interfaces.Repository;

namespace Infrastructure.Repositories;
//TODO: implement
public class YarnRepository : IYarnRepository
{
    private readonly ApplicationDbContext _dbContext;

    public YarnRepository(ApplicationDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public Guid AddYarn(Yarn yarn)
    {
        _dbContext.Yarns.Add(yarn);
        _dbContext.SaveChanges();
        return yarn.Id;
    }

    public void DeleteYarn(Guid yarnId)
    {
        var yarn = _dbContext.Yarns.Find(yarnId);
        if (yarn is not null)
        {
            _dbContext.Yarns.Remove(yarn);
            _dbContext.SaveChanges();
        }
    }

    public IQueryable<Yarn> GetAllYarns()
    {
        var yarns = _dbContext.Yarns;
        return yarns;
    }

    public Yarn GetYarnById(Guid yarnId)
    {
        var yarn = _dbContext.Yarns.FirstOrDefault(i => i.Id == yarnId);
        return yarn;
    }

    public void UpdateYarn(Yarn service)
    {
        _dbContext.Attach(service);
        _dbContext.Entry(service).Property("Name").IsModified = true;
        _dbContext.Entry(service).Property("Quantity").IsModified = true;
        _dbContext.Entry(service).Property("Gauge").IsModified = true;
        _dbContext.Entry(service).Property("Stitch").IsModified = true;
        _dbContext.Entry(service).Property("ToolSize").IsModified = true;

        _dbContext.SaveChanges();
    }
}