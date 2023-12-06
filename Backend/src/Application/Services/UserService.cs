using Application.DTO.User;
using Application.Interfaces.Services;
using AutoMapper;
using Domain.Entities;
using Domain.Interfaces.Repository;

namespace Application.Services;

internal class UserService : IUserService
{
    private readonly IMapper _mapper;
    private readonly IUserRepository _userRepo;

    public UserService(IUserRepository userRepo, IMapper mapper)
    {
        _userRepo = userRepo;
        _mapper = mapper;
    }

    public void DeleteUser(Guid userId)
    {
        _userRepo.DeleteUser(userId);
    }

    public UserDto GetUserById(Guid userId)
    {
        var user = _userRepo.GetUserById(userId);
        var userDto = _mapper.Map<UserDto>(user);

        return userDto;
    }

    public UserDataDto GetUserDataById(Guid userId)
    {
        var user = _userRepo.GetUserById(userId);
        var userDataDto = _mapper.Map<UserDataDto>(user);

        return userDataDto;
    }

    public void UpdateUser(UserDto user)
    {
        var mappedUser = _mapper.Map<User>(user);

        _userRepo.UpdateUser(mappedUser);

    }

    public UserDataDto UpdateUserData(UserDataDto userData)
    {
        var mappedUser = _mapper.Map<User>(userData);

        var newData = _userRepo.UpdateUserData(mappedUser);
        var newDataDto = _mapper.Map<UserDataDto>(newData);

        return newDataDto;
    }
}