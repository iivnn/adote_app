using Microsoft.AspNetCore.Mvc;

namespace AdoteWebApplication.Controllers
{
    public class AnimalController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
