// RegistrationDTO.cs

namespace taskAPI.Models.DTOs;

public class RegistrationDTO
{
    public string Email { get; set; }
    public string Password { get; set; }
    
    public string FirstName { get; set; }
    public string LastName { get; set; }
}