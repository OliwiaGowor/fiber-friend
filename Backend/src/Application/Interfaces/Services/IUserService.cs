using Application.DTO.User;

namespace Application.Interfaces.Services
{
    public interface IUserService
    {
        UserDto GetUserById(Guid id);
        UserDataDto GetUserDataById(Guid id);
        void UpdateUser(UserDto user);
        UserDataDto UpdateUserData(UserDataDto userData);
        void DeleteUser(Guid id);
    }
}
