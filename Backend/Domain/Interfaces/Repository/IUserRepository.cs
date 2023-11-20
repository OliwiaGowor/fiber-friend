using Domain.Entities;
using Microsoft.AspNetCore.JsonPatch;

namespace Domain.Interfaces.Repository;

public interface IUserRepository
{
    User GetUserById(Guid userId);
    User GetUserByEmail(string email);
    Guid AddUser(User user);
    void DeleteUser(Guid userId);
    void UpdateUser(User user);
}
