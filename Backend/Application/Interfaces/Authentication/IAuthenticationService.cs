using Application.Services.Authentication;

namespace Application.Interfaces.Authentication;

public interface IAuthenticationService
{
    AuthenticationResult Register(string username, string email, string password);
    AuthenticationResult Login(string email, string password);
    bool CheckPassword(string password, Guid userId);
}