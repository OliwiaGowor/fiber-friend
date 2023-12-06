using Application.Interfaces.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WebApi.Authentication;

namespace WebApi.Controllers;

[Route("api/Auth")]
[ApiController]
[AllowAnonymous]
public class AuthenticationController : ControllerBase
{
    private readonly IAuthenticationService _authenticationService;

    public AuthenticationController(IAuthenticationService authenticationService)
    {
        _authenticationService = authenticationService;
    }

    [HttpPost(nameof(Register))]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public IActionResult Register(RegisterRequest request)
    {
        var authResult = _authenticationService.Register(
            request.Username,
            request.Email,
            request.Password);

        var response = new AuthenticationResponse(
            authResult.User.Id,
            authResult.User.Username,
            authResult.User.Email,
            authResult.Token);

        return Ok(response);
    }

    [HttpPost(nameof(Login))]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public IActionResult Login(LoginRequest request)
    {
        var authResult = _authenticationService.Login(
            request.Email,
            request.Password);

        var response = new AuthenticationResponse(
            authResult.User.Id,
            authResult.User.Username,
            authResult.User.Email,
            authResult.Token);

        return Ok(response);
    }

    [HttpPost("CheckPassword/{userId:Guid}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public IActionResult CheckPassword([FromBody] string password, Guid userId)
    {
        var isPasswordCorrect = _authenticationService.CheckPassword(password, userId);

        return Ok(isPasswordCorrect);
    }

    [HttpPatch("ChangeUserPassword/{userId:Guid}")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    public IActionResult ChangeUserPassword([FromBody] string password, Guid userId)
    {
        _authenticationService.ChangeUserPassword(userId, password);

        return NoContent();
    }
}