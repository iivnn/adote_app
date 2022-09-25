using Adote.Library;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace AdoteWebApplication.Helpers
{
    [AttributeUsage(AttributeTargets.Class | AttributeTargets.Method)]
    public class AuthorizeAttribute : Attribute, IAuthorizationFilter
    {
        public void OnAuthorization(AuthorizationFilterContext context)
        {
            var user = (User)context.HttpContext.Items["User"];
            if (user == null)
            {
                context.Result = new JsonResult(new AdoteResponse<string>
                {
                    Data = null,
                    Success = false,
                    Message = Message.DefaultUnauthorizedMessage
                }) 
                { StatusCode = StatusCodes.Status401Unauthorized };
            }
        }
    }
}
