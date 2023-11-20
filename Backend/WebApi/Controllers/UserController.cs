using Application.DTO.User;
using Application.Interfaces.Services;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;

namespace WebApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpGet("{id}")]
        public ActionResult<UserDto> GetUserById(Guid id)
        {
            var user = _userService.GetUserById(id);
            if (user == null)
            {
                return NotFound();
            }
            return Ok(user);
        }

        [HttpPatch("{id}")]
        public IActionResult UpdateUser(Guid id, [FromBody] JsonPatchDocument userDocument)
        {
            var existingUser = _userService.GetUserById(id);
            if (existingUser == null)
            {
                return NotFound();
            }

           userDocument.ApplyTo(existingUser);
    
                if (string.IsNullOrEmpty(existingUser.Username) ||
                    string.IsNullOrEmpty(existingUser.Email) ||
                    string.IsNullOrEmpty(existingUser.HashedPassword))
                {
                    return BadRequest();
                }
    
                _userService.UpdateUser(existingUser);
    
                return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteUser(Guid id)
        {
            var existingUser = _userService.GetUserById(id);
            if (existingUser == null)
            {
                return NotFound();
            }
            _userService.DeleteUser(id);
            return NoContent();
        }
    }
}
