using Application.DTO.User;
using Domain.Entities;
using Microsoft.AspNetCore.JsonPatch;

namespace Application.Interfaces.Services
{
    public interface IUserService
    {
        UserDto GetUserById(Guid id);
        void UpdateUser(UserDto user);
        void DeleteUser(Guid id);
    }
}
