using Application.Interfaces.Authentication;
using Domain.Entities;
using Domain.Interfaces.Repository;

namespace Application.Services.Authentication;

public class AuthenticationService : IAuthenticationService
{
    private readonly IJwtTokenGenerator _jwtTokenGenerator;
    private readonly IUserRepository _userRepository;

    public AuthenticationService(IJwtTokenGenerator jwtTokenGenerator, IUserRepository userRepository)
    {
        _jwtTokenGenerator = jwtTokenGenerator;
        _userRepository = userRepository;
    }

    public AuthenticationResult Register(string username,  string email, string password)
    {
        if (_userRepository.GetUserByEmail(email) is not null)
            throw new Exception("User with given email already exists");

        var user = new User
        {
            Username = username,
            Email = email,
            HashedPassword = PasswordHasher.Hash(password)
        };
        _userRepository.AddUser(user);

        var token = _jwtTokenGenerator.GenerateToken(user);

        return new AuthenticationResult(
            user,
            token);
    }

    public AuthenticationResult Login(string email, string password)
    {
        if (_userRepository.GetUserByEmail(email) is not User user)
            throw new Exception("User with given email does not exists");

        var isPasswordCorrect = PasswordHasher.Verify(password, user.HashedPassword);
        if (!isPasswordCorrect) throw new Exception("Invalid password");

        var token = _jwtTokenGenerator.GenerateToken(user);

        return new AuthenticationResult(
            user,
            token);
    }
}