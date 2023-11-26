namespace WebApi.Authentication;

public record RegisterRequest(
    string Username,
    string Email,
    string Password
);