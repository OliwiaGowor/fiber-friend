using Application.DTO.User;
using Application.Interfaces.Services;
using AutoMapper;
using Domain.Entities;
using Domain.Interfaces.Repository;
using Microsoft.AspNetCore.JsonPatch;

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

    public void UpdateUser(UserDto user)
    {
        var mappedUser = _mapper.Map<User>(user);

        _userRepo.UpdateUser(mappedUser);

    }
}