// RegistrationController.cs

using Microsoft.AspNetCore.Mvc;
using taskAPI.Models.DTOs;
using taskAPI.Models.Model;
using taskAPI.Repositories;
using taskAPI.Services.Authentication;
using taskAPI.Services.User.Registration;

namespace taskAPI.Controllers.UserControllers;

[Route("api")]
[ApiController]
public class RegistrationController : BaseController
{
    private readonly IUserCreationService _userCreationService;
    private readonly IJwtTokenService _jwtTokenService;
    private readonly IUserRepository _userRepository;

    public RegistrationController(IUserRepository userRepository, IUserCreationService userCreationService, IJwtTokenService jwtTokenService)
    {
        _userRepository = userRepository;
        _userCreationService = userCreationService;
        _jwtTokenService = jwtTokenService;
    }
    
    [HttpPost("register")]
    public async Task<IActionResult> RegisterUser([FromBody] RegistrationDTO model)
    {
        bool result = await _userCreationService.RegisterUserAsync(model);
    
        if (!result)
        {
            return BadRequest(new { message = "User already exists." });
        }
        
        UserModel user = await _userRepository.GetUserByEmailAsync(model.Email);
        string token = _jwtTokenService.GenerateJwtToken(user);

        return Ok(new { token = token, message = "Registration successful." });
    }
}