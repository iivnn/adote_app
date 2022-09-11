using Microsoft.AspNetCore.Mvc;

namespace AdoteWebApplication.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserController : ControllerBase
    {
        private readonly ILogger<UserController> _logger;

        public UserController(ILogger<UserController> logger)
        {
            _logger = logger;
        }

        [HttpGet(Name = "IsEmailAvailable")]
        public object IsEmailAvailable(string email)
        {
            if (email == null || email == string.Empty || email == "email@email.com")
                return new { IsEmailAvailable = false };
            return new { IsEmailAvailable = true };
        }
    }
}