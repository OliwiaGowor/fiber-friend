using Domain.Entities;

namespace Domain.Interfaces.Repository;

public interface IUserRepository
{
    void DeleteUser(Guid userId);
    Guid AddUser(User user);
    IQueryable<User> GetAllUsers();
    User GetUserById(Guid userId);
    User GetUserByEmail(string email);
    void UpdateUser(User user);
}