namespace WebApi.Authentication;

public record AuthenticationResponse(
    Guid Id,
    string Username,
    string Email,
    string Token
);