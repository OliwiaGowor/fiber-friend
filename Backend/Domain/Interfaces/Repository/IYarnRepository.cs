using Domain.Entities;

namespace Domain.Interfaces.Repository;

public interface IYarnRepository
{
    void DeleteYarn(Guid yarnId);
    Guid AddYarn(Yarn yarn);
    IQueryable<Yarn> GetAllYarns();
    Yarn GetYarnById(Guid yarnId);
    void UpdateYarn(Yarn yarn);
}