using Adote.Library;
using Adote.Library.BusinessContexts;
using Microsoft.AspNetCore.Mvc;

namespace AdoteWebApplication.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly ILogger<UserController> _logger;

        private readonly AdoteContext _context;

        public UserController(ILogger<UserController> logger, AdoteContext adoteContext)
        {
            _logger = logger;
            _context = adoteContext;    
        }

        [HttpPost("Get")]
        public User Get(Guid id)
        {
            try
            {
                if (_context.Users != null)
                {
                    var user = _context.Users.Find(id);
                    return user;
                }                
            }
            catch(Exception ex)
            {

            }
            return null;
        }

        [HttpGet("IsEmailAvailable")]
        public object IsEmailAvailable(string email)
        {
            if (_context.Users != null)
            {
                var users = _context.Users.Where(u => u.Email == email).ToList();
                return new { IsEmailAvailable = users.Count == 0 };
            }
            return false;
        }

    }
}