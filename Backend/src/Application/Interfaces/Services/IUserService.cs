using Application.DTO.User;

namespace Application.Interfaces.Services
{
    public interface IUserService
    {
        UserDto GetUserById(Guid id);
        void UpdateUser(UserDto user);
        void DeleteUser(Guid id);
    }
}
