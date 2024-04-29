// LoginController.cs 

using Microsoft.AspNetCore.Mvc;
using taskAPI.Models.Model;
using taskAPI.Services.Authentication;
using taskAPI.Services.User.Login;

namespace taskAPI.Controllers.UserControllers;

[Route("api")]
[ApiController]
public class LoginController : BaseController
{
    private readonly IUserLoginService _userLoginService;
    private readonly IJwtTokenService _jwtTokenService;

    public LoginController(IUserLoginService userLoginService, IJwtTokenService jwtTokenService)
    {
        _userLoginService = userLoginService;
        _jwtTokenService = jwtTokenService;
    }
    
    [HttpPost("login")]
    public async Task<IActionResult> LoginUser([FromBody] LoginDTO model)
    {
        UserModel? result = await _userLoginService.ValidateUserAsync(model);
        
        if (result == null)
        {
            return Unauthorized(new { message = "Invalid email or password." });
        }

        Console.WriteLine($"User ID: {result.Id}");
        string token = _jwtTokenService.GenerateJwtToken(result);
        
        return Ok(new { token = token });
    }
}